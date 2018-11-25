/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "ndla-i18n";

import FlashMessage from "../../../components/FlashMessage";
import Concept from "../components/Concept";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from '../../Loading';
import WithEither from "../../../components/HOC/WithEither";
import {getConceptById, updateConcept, archiveConcept} from "../../../api";
import {updateFlashMessage, clearFlashMessage} from "../../../components/FlashMessage/";
import {submitErrorHandler, submitFormHandling} from "../conceptCommon";


import {mapStateToProps} from './updateConceptMapStateToProps';
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE as UPDATE_FLASH_MESSAGE, setDeleteButtonAsDisabled, updateInitialFormValues} from "./updateConceptActions";

class UpdateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onCloneClicked = this.onCloneClicked.bind(this);
        this.renderDeleteButton  = this.renderDeleteButton.bind(this);
        this.renderCloneButton = this.renderCloneButton.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE);
        this.props.updateInitialFormValues(null);
    }

    loadConcept() {
        const {updateFlashMessage, match: {params: {id}}} = this.props;
        const errMessage = this.props.t('updateConcept.loadDataMessage.error.title');

        getConceptById(id)
            .then(data => {
                if (data.data) {
                    const {data: concept} = data.data;
                    const meta = {};

                    concept.meta.forEach(x => {
                        meta[`meta_${x.category.name.toLowerCase()}`] = {value: x.id, label: x.name};
                    });
                    const statusId = {value: concept.status.id, label: concept.status.name};
                    this.props.updateInitialFormValues({
                        ...concept,
                        statusId,
                        ...meta,
                    });
                    this.props.setDeleteButtonAsDisabled(statusId.label === "Archived");
                }
            })
            .catch(err =>  submitErrorHandler(err, {titleMessage: errMessage, actionType: UPDATE_FLASH_MESSAGE}, updateFlashMessage));
    }


    onCloneClicked() {
        this.props.history.push(`/clone/${this.props.initialFormValues.id}`);
    }

    onDeleteClicked() {
        const {clearFlashMessage, initialFormValues: {id}} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE);

        this.handleSubmit(archiveConcept(id), "deleteMessage");
    }

    submit(concept) {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE);
        const update = updateConcept(concept);
        this.handleSubmit(update, "submitMessage");
        return update;
    }

    handleSubmit(submitFunction, message) {
        const {initialFormValues: {id}, history, t, updateFlashMessage} = this.props;
        const successHandler = {
            actionType: UPDATE_FLASH_MESSAGE,
            titleMessage: t(`updateConcept.${message}.success.title`),
            history,
            id
        };
        const errorHandler = {
            titleMessage: t(`updateConcept.${message}.error.title`),
            actionType: UPDATE_FLASH_MESSAGE,
        };
        submitFormHandling(submitFunction, successHandler, errorHandler, updateFlashMessage);
    }

    renderCloneButton() {
        return <button className="c-button c-button--outline" type="button" onClick={this.onCloneClicked}>{this.props.t("updateConcept.button.clone")}</button>
    }

    renderDeleteButton() {
        return <button className="c-button c-button--outline" type="button" disabled={this.props.deleteButtonIsDisabled} >{this.props.t("updateConcept.button.delete")}</button>
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept status={this.props.status}
                               initialValues={this.props.initialFormValues}
                               t={this.props.t}
                               metas={this.props.meta}
                               title={this.props.t("updateConcept.title")}
                               submitConcept={this.submit}
                               showTimestamps={true}>

                <ConfirmModal t={this.props.t}
                              triggerButton={this.renderDeleteButton}
                              onConfirm={this.onDeleteClicked}
                              title="updateConcept.confirmModal.delete.title"
                              content="updateConcept.confirmModal.delete.action"/>
                <ConfirmModal t={this.props.t}
                              triggerButton={this.renderCloneButton}
                              onConfirm={this.onCloneClicked}
                              title="updateConcept.confirmModal.clone.title"
                              content="updateConcept.confirmModal.clone.action" />
            </Concept>;
        } else {
            return <Loading message="loadingMessage.initializingForm"/>
        }
    }

    render() {
       return (
            <React.Fragment>
                <FlashMessage {...this.props.flashMessage}/>
                {this.renderContent()}
            </React.Fragment>

        );
    }
}


const metaExists = ({meta}) =>  meta.length > 0;
const statusExists = ({status}) => status.length > 0;

export default compose(
    withRouter,
    connect(mapStateToProps, {archiveConcept, updateFlashMessage, clearFlashMessage, updateInitialFormValues, setDeleteButtonAsDisabled}),
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(UpdateConceptPageContainer);
