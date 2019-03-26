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
import {Route, Switch} from "react-router";
import {Breadcrumb, OneColumn} from "@ndla/ui";
import Button from "@ndla/button";
import {change } from 'redux-form'

import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";
import {dropdownFormat, submitErrorHandler, submitSuccessHandler} from './conceptCommon';

import {
    metaExists,
    statusExists,

} from "./conceptCommon";
import {clearFlashMessage, flashMessageShape, updateFlashMessage} from "../../components/FlashMessage";
import {historyProps, matchProps} from "../../utilities/commonProps";
import ApiService from "../../services/apiService";
import {UPDATE_FLASH_MESSAGE_CONCEPT, updateInitialFormValues} from "./conceptActions";

import {
    copyConceptRoute,
    createLanguageVariationRoute,
    editConceptRoute,
    indexRoute,
    routeIsAllowed,
    createConceptRoute, createRoute, searchRoute
} from "../../utilities/routeHelper";

import Concept from "./components/Concept";
import ConceptRoutes from "./ConceptRoutes";
import PrivateRoute from '../PrivateRoute';
import {config} from "../../config";
import {CONCEPT_FORM_NAME} from "./components/Concept/ConceptComponent";
import ConfirmModal from "../../components/ConfirmModal";
import {loginSuccess} from "../Login";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";


import 'url-search-params-polyfill';

class ConceptPageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.updateConcept = this.updateConcept.bind(this);
        this.createConcept = this.createConcept.bind(this);
        this.renderDeleteButton = this.renderDeleteButton.bind(this);
        this.renderConceptRoutes = this.renderConceptRoutes.bind(this);
        this.navigate = this.navigate.bind(this);
        this.renderCopyPage = this.renderPage.bind(this, {
            pageTitle: "copyConceptPage.title",
            submitButtonText: "copyConceptPage.button.submit",
            messages: {success: "copyConceptPage.submitMessage.success", error: "copyConceptPage.submitMessage.error"},
            route: copyConceptRoute
        });
        this.renderCreateLanguageVariationPage = this.renderPage.bind(this, {
            pageTitle: "createConceptLanguageVariationPage.title",
            isLanguageVariation: true,
            submitButtonText: "createConceptLanguageVariationPage.button.submit",
            messages: {success: "createConceptLanguageVariationPage.submitMessage.success", error: "createConceptLanguageVariationPage.submitMessage.error"},
            route: createLanguageVariationRoute
        });
        this.renderEditPage = this.renderPage.bind(this, {
            pageTitle: "editConceptPage.title",
            isUpdate: true,
            submitButtonText: "editConceptPage.button.submit",
            messages: {success: "editConceptPage.submitMessage.success", error: "editConceptPage.submitMessage.error"},
            route: editConceptRoute,
        });
        this.renderNewPage = this.renderPage.bind(this, {
            pageTitle: "createConceptPage.title",
            useInitialValues: false,
            submitButtonText: "createConceptPage.button.submit",
            messages: {success: "createConceptPage.submitMessage.success", error: "createConceptPage.submitMessage.error"},
            route: createConceptRoute
        });
    }
    componentWillUnmount() {
        this.props.clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT);
    }

    isReadOnly(){
        return !routeIsAllowed(this.props.requiredScopes, this.props.userScopes, this.props.isAuthenticated);
    }

    submit(callback, submitSuccessMessage, submitFailMessage) {
        const {clearFlashMessage, updateFlashMessage, history, match} = this.props;

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
                match
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

    onArchiveConcept(id) {
        const {clearFlashMessage, history, updateFlashMessage, match} = this.props;

        clearFlashMessage(UPDATE_FLASH_MESSAGE_CONCEPT);

        const successHandler = {
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT,
            titleMessage: `editConceptPage.deleteMessage.success`,
            history,
            id,
            match
        };
        const errorHandler = {
            titleMessage: `editConceptPage.deleteMessage.error`,
            actionType: UPDATE_FLASH_MESSAGE_CONCEPT,
        };

        this.props.apiService
            .delete(id, this.props.apiService.endpoints.concept)
            .then(data => submitSuccessHandler(data, successHandler, updateFlashMessage))
            .then(data => {
                const status = this.props.status.find(x => x.typeGroup.name.toLowerCase() === "archived");
                if (status)
                    this.props.change(CONCEPT_FORM_NAME, "statusId", status.languageVariation)
            })
            .catch(err => submitErrorHandler(err, errorHandler, updateFlashMessage));
    }

    navigate(to) {
        const {history, match} = this.props;
        history.push(createRoute(match, to));
    }

    initDataForNewConcept() {
        const {locale, meta, history} = this.props;
        const data = {};

        const language = meta.find(x => x.abbreviation === locale);
        const licence =  meta.find(x => x.category.typeGroup.name.toLowerCase() === "license");

        if (language)
            data['meta_language'] = language.languageVariation;
        if(licence)
            data['meta_license'] = licence.languageVariation;

        const urlParams = new URLSearchParams(history.location.search);
        if (urlParams.get('title'))
            data['title'] = urlParams.get('title');
        return data;
    }

    renderDeleteButton() {
        const {t} = this.props;
        return (
            <Button className="form-button"
                    outline={true}
            >
                {t("editConceptPage.button.delete")}
            </Button>);
    }

    renderPage({pageTitle, submitButtonText, useInitialValues=true, isLanguageVariation=false, isUpdate=false, messages={success :'', error: ''}, route}, id=null) {
        const {t,
            meta,
            apiService,
            match,
            initialFormValues,
            mediaTypes,
            locale,
            status,
            change,
            clearFlashMessage
        } = this.props;
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: searchRoute(), name: t('searchPage.title')},
        ];
        if (id)
            breadCrumbs.push({to: createRoute(match,route(id)), name: t(pageTitle)});
        else
            breadCrumbs.push({to: createRoute(match,indexRoute()), name: t(pageTitle)});

        if (useInitialValues && !initialFormValues)
            return <Loading message="loadingMessage.initializingForm"/>;

        return (
            <OneColumn>
                <Breadcrumb items={breadCrumbs}/>
                <Concept t={t}
                         metas={meta}
                         apiService={apiService}
                         initialValues={useInitialValues ? initialFormValues : this.initDataForNewConcept()}
                         mediaTypes={mediaTypes}
                         locale={locale}
                         isReadOnly={this.isReadOnly()}
                         status={status}
                         pageTitle={pageTitle}
                         submitMessages={messages}
                         submitConcept={isUpdate ? this.updateConcept : this.createConcept}
                         submitButtonText={submitButtonText}
                         isUpdate={isUpdate}
                         changeField={change}
                         isLanguageVariation={isLanguageVariation}
                         clearFlashMessage={clearFlashMessage}
                >
                    {isUpdate && !this.isReadOnly() && (
                        <React.Fragment>
                            <Button className="form-button"
                                    outline={true}
                                    onClick={() => this.navigate(copyConceptRoute(id))}
                            >
                                {t("editConceptPage.button.copy")}
                            </Button>
                            <Button className="form-button"
                                    outline={true}
                                    onClick={() => this.navigate(createLanguageVariationRoute(id))}
                            >
                                {t("editConceptPage.button.createNewLanguageVariation")}
                            </Button>
                            <ConfirmModal t={this.props.t}
                                          triggerButton={this.renderDeleteButton}
                                          onConfirm={this.onArchiveConcept.bind(this, id)}
                                          title="editConceptPage.confirmModal.delete.title"
                                          content="editConceptPage.confirmModal.delete.action"/>
                        </React.Fragment>
                    )}
                </Concept>
            </OneColumn>
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
                           accessToken={this.props.accessToken}
                           updateInitialFormValues={this.props.updateInitialFormValues}
                           createConceptRequiredScope={this.props.createConceptRequiredScope}
                           updateConceptRequiredScope={this.props.updateConceptRequiredScope}
                            flashMessage={this.props.flashMessage}/>
        )
    }

    render() {
        const { match} = this.props;
        return (
            <Switch>
                <PrivateRoute path={`${match.url}/new`} render={this.renderNewPage} requiredScopes={this.props.updateConceptRequiredScope}/>
                <Route path={`${match.url}/:id`} render={this.renderConceptRoutes} />
            </Switch>
        );
    }
}

ConceptPageContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    match: PropTypes.shape(matchProps).isRequired,
    meta: PropTypes.array.isRequired,
    history: PropTypes.shape(historyProps).isRequired,
    status: PropTypes.array.isRequired,
    locale: PropTypes.string.isRequired,
    clearFlashMessage: PropTypes.func.isRequired,
    updateFlashMessage: PropTypes.func.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    mediaTypes: PropTypes.array.isRequired,
    isLanguageVariation: PropTypes.bool,
    change: PropTypes.func.isRequired,

    // Optional
    accessToken: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    initialFormValues: PropTypes.object,
    userScopes: PropTypes.arrayOf(PropTypes.string),
    flashMessage: PropTypes.shape(flashMessageShape),
    requiredScopes: PropTypes.arrayOf(PropTypes.string),
    createConceptRequiredScope: PropTypes.arrayOf(PropTypes.string),
    updateConceptRequiredScope: PropTypes.arrayOf(PropTypes.string),
};

ConceptPageContainer.defaultProps = {
    userScopes: [],
    accessToken: '',
    isAuthenticated: false,
    isLanguageVariation: false,
    requiredScopes: [config.SCOPES.concept_write, config.SCOPES.concept_admin],
    createConceptRequiredScope: [config.SCOPES.concept_write, config.SCOPES.concept_admin],
    updateConceptRequiredScope: [config.SCOPES.concept_write, config.SCOPES.concept_admin],
};

const mapStateToPropsCommon = ({
    concept: {initialFormValues, flashMessage},
    locale,
    cacheFromServer: {status, meta, mediaTypes},
    credentials: {accessToken, isAuthenticated, scopes}}) => ({
        accessToken,
        isAuthenticated,
        userScopes: scopes,
        meta,
        mediaTypes,
        locale,
        flashMessage,
        status: status.map(x => dropdownFormat(x)),
        initialFormValues
    });


export default compose(
    withRouter,
    withAuthenticationService,
    connect(mapStateToPropsCommon, {updateFlashMessage, updateInitialFormValues, clearFlashMessage, change, loginSuccess}),
    withApiService,
    injectT,
    WithEither(metaExists, () => <Loading message="loadingMessage.loadingMeta"/>),
    WithEither(statusExists, () => <Loading message="loadingMessage.loadingStatus"/>),
)(ConceptPageContainer);

