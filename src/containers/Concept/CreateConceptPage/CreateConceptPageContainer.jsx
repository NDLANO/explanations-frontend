/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {injectT} from "@ndla/i18n";
import {Helmet} from "react-helmet";
import {Breadcrumb, OneColumn} from '@ndla/ui';
import { change } from "redux-form";

import Concept from "../components/Concept/";
import Loading from '../../../components/Loading';
import WithEither from "../../../components/HOC/WithEither";
import withApiService from "../../../components/HOC/withApiService";
import FlashMessage, {updateFlashMessage, clearFlashMessage, flashMessageShape} from "../../../components/FlashMessage";
import {UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE} from "../UpdateConceptPage";
import {metaExists, statusExists, submitErrorHandler, submitSuccessHandler} from "../conceptCommon";


import {mapStateToProps} from "./createConceptMapStateToProps";
import {UPDATE_FLASH_MESSAGE_CONCEPT_CREATE} from "./createConceptActions";
import {createRoute, indexRoute} from "../../../utilities/routeHelper";
import {historyShape} from "../../../utilities/commonShapes";
import ApiService from "../../../services/apiService";
import {CONCEPT_FORM_NAME} from "../components/Concept/ConceptComponent";


class CreateConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const status = this.props.status.find(x => x.label.toLowerCase() === this.props.t('phrases.draft').toLowerCase());
        if (status)
            this.props.change(CONCEPT_FORM_NAME, 'statusId', status.value);

    }

    componentWillUnmount() {
        this.props.updateFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE);
    }

    submit(concept) {
        const {clearFlashMessage, updateFlashMessage,  history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT_CREATE);

        const create = this.props.apiService.create(concept, this.props.apiService.endpoints.concept);
        const errorHandler = {
            titleMessage: `createConcept.submitMessage.error.title`,
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT_CREATE,
            history
        };

        create
            .then(data => submitSuccessHandler(data, {
                actionType: UPDATE_FLASH_MESSAGE_CONCEPT_UPDATE,
                titleMessage: `createConcept.submitMessage.success.title`,
                history,
                id: data.data.data.id,
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return create;
    }

    render() {
        const {t, flashMessage, initialFormValues, meta, status, locale} = this.props;

        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: createRoute(), name: t('createConcept.title')},
        ];
        return (
            <React.Fragment>
                <Helmet title={t('pageTitles.createConcept')} />
                <FlashMessage {...flashMessage} t={t}/>
                <OneColumn>
                    <Breadcrumb items={breadCrumbs} />
                    <Concept status={status}
                             initialValues={initialFormValues}
                             t={t}
                             locale={locale}
                             metas={meta}
                             media={[]}
                             title={t("createConcept.title")}
                             submitConcept={this.submit}
                             mediaTypes={this.props.mediaTypes}
                             apiService={this.props.apiService}
                    />
                </OneColumn>
            </React.Fragment>
        );
    }
}

CreateConceptPageContainer.propTypes = {
    t: PropTypes.func.isRequired,
    meta: PropTypes.array.isRequired,
    history: historyShape.isRequired,
    status: PropTypes.array.isRequired,
    clearFlashMessage: PropTypes.func.isRequired,
    updateFlashMessage: PropTypes.func.isRequired,
    initialFormValues: PropTypes.object.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    locale: PropTypes.string.isRequired,
    mediaTypes: PropTypes.array.isRequired,
    change: PropTypes.func.isRequired,

    // Optional
    flashMessage: PropTypes.shape(flashMessageShape),
};


const formHasInitialValues = ({initialFormValues}) =>
    Object.values(initialFormValues).indexOf(null) === -1 &&
    Object.values(initialFormValues).indexOf(undefined) === -1 &&
    Object.keys(initialFormValues).filter(x => x.startsWith('meta_')).length > 1;

export default compose(
    withRouter,
    connect(mapStateToProps, {updateFlashMessage, clearFlashMessage, change}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
    WithEither(formHasInitialValues, () => <Loading message="loadingMessage.initializingForm"/>),
)(CreateConceptPageContainer);