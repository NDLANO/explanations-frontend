/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "@ndla/i18n";
import {Helmet} from "react-helmet";
import {Breadcrumb, OneColumn} from '@ndla/ui';

import Loading from '../../../components/Loading';
import Concept from "../components/Concept";
import WithEither from "../../../components/HOC/WithEither";
import withApiService from "../../../components/HOC/withApiService";

import {
    loadConcept,
    metaExists,
    statusExists,
    submitErrorHandler,
    submitSuccessHandler
} from "../conceptCommon";
import FlashMessage, {clearFlashMessage, flashMessageShape, updateFlashMessage} from "../../../components/FlashMessage";
import {mapStateToProps} from './cloneConceptMapStateToProps';
import {cloneRoute, indexRoute} from "../../../utilities/routeHelper";
import {historyShape, matchShape} from "../../../utilities/commonShapes";
import ApiService from "../../../services/apiService";

import {UPDATE_FLASH_MESSAGE_CONCEPT_CLONE, updateInitialFormValues} from "./cloneConceptActions";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage";

class CloneConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {updateFlashMessage, history, t, updateInitialFormValues} = this.props;
        const errorHandler = {
            titleMessage: 'cloneConcept.loadDataMessage.error.title',
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT_CLONE,
            history
        };

        loadConcept(this.props.apiService, this.getConceptId(), t)
            .then(concept => updateInitialFormValues({...concept, statusId: concept.status.languageVariation}))
            .catch( err => submitErrorHandler(err, errorHandler, updateFlashMessage));
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);

        const create = this.props.apiService.create(concept, this.props.apiService.endpoints.concept);
        const errorHandler = {
            titleMessage: `cloneConcept.submitMessage.error.title`,
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT_CLONE,
            history
        };

        create
            .then(data => submitSuccessHandler(data, {
                actionType: UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE,
                titleMessage: `cloneConcept.submitMessage.success.title`,
                history,
                id: this.getConceptId(),
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return create;
    }

    getConceptId() {
        return this.props.match.params.id;
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept Concept status={this.props.status}
                            initialValues={this.props.initialFormValues}
                            t={this.props.t}
                            locale={this.props.locale}
                            metas={this.props.meta}
                            title={this.props.t("createConcept.title")}
                            submitConcept={this.submit}
                            mediaTypes={this.props.mediaTypes}
                            apiService={this.props.apiService}/>;
        } else {
            return <Loading message="loadingMessage.initializingForm"/>
        }
    }

    render() {
        const {t, flashMessage} = this.props;
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: cloneRoute(this.getConceptId()), name: t('cloneConcept.title')},
        ];
        return (
            <React.Fragment>
                <Helmet title={t('pageTitles.cloneConcept')} />
                <FlashMessage {...flashMessage} t={t}/>
                <OneColumn>
                    <Breadcrumb items={breadCrumbs} />
                    {this.renderContent()}
                </OneColumn>
            </React.Fragment>
        );
    }
}


CloneConceptPageContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    match: matchShape.isRequired,
    meta: PropTypes.array.isRequired,
    history: historyShape.isRequired,
    status: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    clearFlashMessage: PropTypes.func.isRequired,
    updateFlashMessage: PropTypes.func.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    mediaTypes: PropTypes.array.isRequired,
    // Optional
    flashMessage: PropTypes.shape(flashMessageShape),
    initialFormValues: PropTypes.object,
};

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage, updateInitialFormValues, clearFlashMessage}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(CloneConceptPageContainer);

