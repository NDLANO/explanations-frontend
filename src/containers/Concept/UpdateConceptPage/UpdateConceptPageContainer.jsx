/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "@ndla/i18n";
import {Breadcrumb, OneColumn} from '@ndla/ui';
import Button from '@ndla/button';

import FlashMessage, {flashMessageShape} from "../../../components/FlashMessage";
import Concept from "../components/Concept";
import ConfirmModal from "../../../components/ConfirmModal";
import Loading from '../../../components/Loading';
import WithEither from "../../../components/HOC/WithEither";
import {updateFlashMessage, clearFlashMessage} from "../../../components/FlashMessage/";
import {
    getMetasFromApiResult,
    metaExists,
    statusExists,
    submitErrorHandler,
    submitFormHandling
} from "../conceptCommon";
import {cloneRoute, indexRoute, routeIsAllowed, updateRoute} from "../../../utilities/routeHelper";


import {mapStateToProps} from './updateConceptMapStateToProps';
import {
    UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE as UPDATE_FLASH_MESSAGE,
    setDeleteButtonAsDisabled,
    updateInitialFormValues
} from "./updateConceptActions";
import ApiService from "../../../services/apiService";
import withApiService from "../../../components/HOC/withApiService";
import {historyShape, matchShape} from "../../../utilities/commonShapes";


class UpdateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onCloneClicked = this.onCloneClicked.bind(this);
        this.renderDeleteButton  = this.renderDeleteButton.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE);
        this.props.updateInitialFormValues(null);
    }

    loadConcept() {
        const {updateFlashMessage, history} = this.props;
        const errorHandler = {
            titleMessage: 'updateConcept.loadDataMessage.error.title',
            actionType: UPDATE_FLASH_MESSAGE,
            history
        };

        this.props.apiService.getConceptById(this.getConceptId())
            .then(concept => {
                const meta = getMetasFromApiResult(concept);
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

    getConceptId() {
        const {match: {params: {id}}} = this.props;
        return id;
    }

    isReadOnly(){
        return !routeIsAllowed(this.props.requiredScopes, this.props.userScopes, this.props.isAuthenticated);
    }

    onCloneClicked() {
        this.props.history.push(cloneRoute(this.getConceptId()));
    }

    onDeleteClicked() {
        const {clearFlashMessage} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE);

        this.handleSubmit(this.props.apiService.archiveConcept(this.getConceptId()), "deleteMessage");
    }

    submit(concept) {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE);
        const update = this.props.apiService.updateConcept(concept);
        this.handleSubmit(update, "submitMessage");
        return update;
    }

    handleSubmit(submitFunction, message) {
        const {history, updateFlashMessage} = this.props;
        const successHandler = {
            actionType: UPDATE_FLASH_MESSAGE,
            titleMessage: `updateConcept.${message}.success.title`,
            history,
            id: this.getConceptId()
        };
        const errorHandler = {
            titleMessage: `updateConcept.${message}.error.title`,
            actionType: UPDATE_FLASH_MESSAGE,
        };
        return submitFormHandling(submitFunction, successHandler, errorHandler, updateFlashMessage);
    }

    renderDeleteButton() {
        return <Button className="form-button" outline={true} disabled={this.isReadOnly() || this.props.deleteButtonIsDisabled}>{this.props.t("updateConcept.button.delete")}</Button>;
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept    status={this.props.status}
                               initialValues={this.props.initialFormValues}
                               t={this.props.t}
                               metas={this.props.meta}
                               title={this.props.t("updateConcept.title")}
                               submitConcept={this.submit}
                               showTimestamps={true}
                               isReadOnly={this.isReadOnly()}
                               locale={this.props.locale}>

                <ConfirmModal t={this.props.t}
                              triggerButton={this.renderDeleteButton}
                              onConfirm={this.onDeleteClicked}
                              title="updateConcept.confirmModal.delete.title"
                              content="updateConcept.confirmModal.delete.action"/>
                <Button className="form-button" outline={true} onClick={this.onCloneClicked} disabled={this.isReadOnly()}>{this.props.t("updateConcept.button.clone")}</Button>
            </Concept>;
        } else {
            return <Loading message="loadingMessage.initializingForm"/>
        }
    }

    render() {
        const {t, flashMessage} = this.props;
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: updateRoute(this.getConceptId()), name: t('updateConcept.title')},
        ];
       return (
           <React.Fragment>
               <Helmet title={t('pageTitles.updateConcept')} />
               <FlashMessage {...flashMessage} t={t}/>
               <OneColumn>
                   <Breadcrumb items={breadCrumbs} />
                   {this.renderContent()}
               </OneColumn>
           </React.Fragment>
        );
    }
}

UpdateConceptPageContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    match: matchShape.isRequired,
    history: historyShape.isRequired,
    locale: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    clearFlashMessage: PropTypes.func.isRequired,
    updateFlashMessage: PropTypes.func.isRequired,
    deleteButtonIsDisabled: PropTypes.bool.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    setDeleteButtonAsDisabled: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    userScopes: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredScopes: PropTypes.arrayOf(PropTypes.string).isRequired,

    // Optional
    meta: PropTypes.array,
    status: PropTypes.array,
    flashMessage: PropTypes.shape(flashMessageShape),
    initialFormValues: PropTypes.object,
};

UpdateConceptPageContainer.defaultProps = {
    meta: [],
    status:[],
};

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage, clearFlashMessage, updateInitialFormValues, setDeleteButtonAsDisabled}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(UpdateConceptPageContainer);
