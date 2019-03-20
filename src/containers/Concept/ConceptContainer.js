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
import {Route, Switch} from "react-router";
import {Breadcrumb, OneColumn} from "@ndla/ui";

import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";
import {dropdownFormat, submitErrorHandler, submitSuccessHandler} from './conceptCommon';

import {
    metaExists,
    statusExists,
} from "./conceptCommon";
import FlashMessage, {clearFlashMessage, flashMessageShape, updateFlashMessage} from "../../components/FlashMessage";
import {historyShape, matchShape} from "../../utilities/commonShapes";
import ApiService from "../../services/apiService";
import {UPDATE_FLASH_MESSAGE_CONCEPT, updateInitialFormValues} from "./conceptActions";

import {cloneRoute, indexRoute} from "../../utilities/routeHelper";

import Concept from "./components/Concept";
import ConceptRoutes from "./ConceptRoutes";
class ConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.updateConcept = this.updateConcept.bind(this);
        this.createConcept = this.createConcept.bind(this);
        this.renderCopyPage = this.renderPage.bind(this, {
            pageTitle: "copyConceptPage.title",
            messages: {success: "copyConceptPage.success", error: "copyConceptPage.error"}
        });
        this.renderCreateLanguageVariationPage = this.renderPage.bind(this, {
            pageTitle: "newLanguageVariationPage.title",
            isLanguageVariation: true,
            messages: {success: "createLanguageConceptPage.success", error: "createLanguageConceptPage.error"}
        });
        this.renderEditPage = this.renderPage.bind(this, {
            pageTitle: "editConceptPage.title",
            isUpdate: true,
            messages: {success: "editConceptPage.success", error: "editConceptPage.error"}
        });
        this.renderNewPage = this.renderPage.bind(this, {
            pageTitle: "newConceptPage.title",
            useInitialValues: false,
            messages: {success: "newConceptPage.success", error: "newConceptPage.error"}
        });
        this.renderConceptRoutes = this.renderConceptRoutes.bind(this);
    }

    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT);
    }

    submit(callback, submitSuccessMessage, submitFailMessage) {
        const {clearFlashMessage, updateFlashMessage, history} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT);

        const errorHandler = {
            titleMessage: submitFailMessage,
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT,
            history
        };

        callback
            .then(data => submitSuccessHandler(data, {
                actionType: UPDATE_FLASH_MESSAGE_CONCEPT,
                titleMessage: submitSuccessMessage,
                history,
                id: data.data.data.id,
            }, updateFlashMessage))
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
        return callback;
    }

    createConcept(concept, messages) {
        return this.submit(this.props.apiService.create(concept, this.props.apiService.endpoints.concept), messages.success, messages.error);
    }
    updateConcept(concept, messages) {
        return this.submit(this.props.apiService.update(concept, this.props.apiService.endpoints.concept), messages.success, messages.error);
    }

    renderPage({pageTitle, useInitialValues=true, isLanguageVariation=false, isUpdate=false, messages={success :'', error: ''}}, id=null) {
        const {t, meta, apiService, initialFormValues, mediaTypes, locale, status, } = this.props;
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
        ];
        if (id)
            breadCrumbs.push({to: cloneRoute(id), name: t(pageTitle)});
        else
            breadCrumbs.push({to: indexRoute(), name: t(pageTitle)});

        if (useInitialValues && !initialFormValues)
            return <p>wait</p>;

        return (
            <React.Fragment>
                <Breadcrumb items={breadCrumbs}/>
                <Concept t={t}
                         metas={meta}
                         apiService={apiService}
                         initialValues={useInitialValues ? initialFormValues : null}
                         mediaTypes={mediaTypes}
                         locale={locale}
                         status={status}
                         submitMessages={messages}
                         submitConcept={isUpdate ? this.updateConcept : this.createConcept}
                         submitButtonText={t(pageTitle)}
                         isLanguageVariation={isLanguageVariation}/>
            </React.Fragment>
        )
    }

    renderConceptRoutes() {
        return (
            <ConceptRoutes renderCopyPage={this.renderCopyPage}
                           renderCreateLanguageVariationPage={this.renderCreateLanguageVariationPage}
                           renderEditPage={this.renderEditPage}
                           history={this.props.history}
                           apiService={this.props.apiService}
                           updateFlashMessage={this.props.updateFlashMessage}
                           t={this.props.t}
                           updateInitialFormValues={this.props.updateInitialFormValues}
                            clearFlashMessage={this.props.clearFlashMessage}/>
        )
    }

    render() {
        const {t, flashMessage, match} = this.props;
        return (
            <React.Fragment>
                <Helmet title={t('pageTitles.cloneConcept')} />
                <FlashMessage {...flashMessage} t={t}/>
                <OneColumn>
                    <Switch>
                        <Route path={`${match.url}/new`} render={this.renderNewPage} />
                        <Route path={`${match.url}/:id`} render={this.renderConceptRoutes} />
                    </Switch>
                </OneColumn>
            </React.Fragment>
        );
    }
}

ConceptPageContainer.propTypes = {
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
    isLanguageVariation: PropTypes.bool,

    // Optional
    flashMessage: PropTypes.shape(flashMessageShape),
    initialFormValues: PropTypes.object,
};

ConceptPageContainer.defaultProps = {
    isLanguageVariation: false
};

const mapStateToPropsCommon = ({
    concept: {initialFormValues, flashMessage},
    locale,
    cacheFromServer: {status, meta, mediaTypes},
    credentials: {accessToken}}) => ({
        accessToken: accessToken,
        meta,
        mediaTypes,
        locale,
        flashMessage,
        status: status.map(x => dropdownFormat(x)),
        initialFormValues
    });


export default compose(
    withRouter,
    connect(mapStateToPropsCommon, {updateFlashMessage, updateInitialFormValues, clearFlashMessage}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(ConceptPageContainer);

