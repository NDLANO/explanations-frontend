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
import {Button} from "ndla-ui";

import FlashMessage from "../../../components/FlashMessage";
import Concept from "../components/Concept";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from '../../Loading';
import WithEither from "../../../components/HOC/WithEither";
import withApiService from "../../../components/HOC/withApiService";
import {updateFlashMessage, clearFlashMessage} from "../../../components/FlashMessage/";
import {submitErrorHandler, submitFormHandling} from "../conceptCommon";
import {cloneRoute, routeIsAllowed} from "../../../utilities/routeHelper";


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
        const {updateFlashMessage, match: {params: {id}}, history} = this.props;
        const errorHandler = {
            titleMessage: this.props.t('updateConcept.loadDataMessage.error.title'),
            actionType: UPDATE_FLASH_MESSAGE,
            history
        };

        this.props.apiService.getConceptById(id)
            .then(concept => {
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
            })
            .catch(err =>  submitErrorHandler(err, errorHandler, updateFlashMessage));
    }

    isReadOnly = () => !routeIsAllowed(this.props.requiredScopes, this.props.userScopes, this.props.isAuthenticated);

    onCloneClicked() {
        this.props.history.push(cloneRoute(this.props.initialFormValues.id));
    }

    onDeleteClicked() {
        const {clearFlashMessage, initialFormValues: {id}} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE);

        this.handleSubmit(this.props.apiService.archiveConcept(id), "deleteMessage");
    }

    submit(concept) {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE);
        const update = this.props.apiService.updateConcept(concept);
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
        return submitFormHandling(submitFunction, successHandler, errorHandler, updateFlashMessage);
    }

    renderCloneButton() {
        return <Button outline={true} onClick={this.onCloneClicked} disabled={this.isReadOnly()}>{this.props.t("updateConcept.button.clone")}</Button>
    }

    renderDeleteButton() {
        return <Button outline={true} disabled={this.isReadOnly() || this.props.deleteButtonIsDisabled}>{this.props.t("updateConcept.button.delete")}</Button>;
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept status={this.props.status}
                               initialValues={this.props.initialFormValues}
                               t={this.props.t}
                               metas={this.props.meta}
                               title={this.props.t("updateConcept.title")}
                               submitConcept={this.submit}
                               showTimestamps={true}
                               isReadOnly={this.isReadOnly()}>

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
    connect(mapStateToProps, {updateFlashMessage, clearFlashMessage, updateInitialFormValues, setDeleteButtonAsDisabled}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(UpdateConceptPageContainer);
