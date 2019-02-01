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
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage/updateConceptActions";
import {
    getMetasFromApiResult,
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

class CloneConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.loadConcept();
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CLONE);

        const create = this.props.apiService.createConcept(concept);
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
                id: data.data.data.id,
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return create;
    }

    getConceptId() {
        return this.props.match.params.id;
    }

    loadConcept() {
        this.props.apiService.getConceptById(this.getConceptId()).then(concept => {

            delete concept.created;
            delete concept.id;
            delete concept.updated;

            const meta = getMetasFromApiResult(concept);

            this.props.updateInitialFormValues({
                ...concept,
                statusId: {value: concept.status.id, label: concept.status.name},
                ...meta,
            });
        })
    }

    renderContent() {
        if (this.props.initialFormValues) {
            return <Concept Concept status={this.props.status}
                            initialValues={this.props.initialFormValues}
                            t={this.props.t}
                            locale={this.props.locale}
                            metas={this.props.meta}
                            title={this.props.t("createConcept.title")}
                            submitConcept={this.submit} />;
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

