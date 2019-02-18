/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {injectT} from "@ndla/i18n";
import 'url-search-params-polyfill';

import {loginSuccess} from "../Login";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import AuthenticationService from "../../services/authenticationService";
import {indexRoute} from "../../utilities/routeHelper";
import {historyShape} from "../../utilities/commonShapes";
import Loading from "../../components/Loading";
import {updateSearchQuery} from "../SearchPage/searchPageActions";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import {isTokenExpired} from "../../utilities/tokenHelper";
import {logoutSuccess} from "../LogoutPage";


class EmbeddedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "loadingMessage.default"
        };
    }

    componentDidMount() {
        const {history,apiService} = this.props;
        const searchParam = new URLSearchParams(history.location.search);
        const language = searchParam.get('language');
        const subject = searchParam.get('subject');

        const initialFormValues = {term: searchParam.get('term')};
        const promiseMap = {};
        const promises = [];

        if (language){
            promiseMap[promises.length] = 'language';
            promises.push(apiService.getById(language, apiService.endpoints.meta));
        }
        if (subject) {
            promiseMap[promises.length] = 'subject';
            promises.push(apiService.getById(subject, apiService.endpoints.meta));
        }

        Promise.all(promises)
            .then((resolvedPromises) => resolvedPromises.forEach((value, index) => initialFormValues[promiseMap[index]] = value))
            .catch()
            .finally(() => this.validateToken(searchParam.get('accessToken'), initialFormValues));
    }

    validateToken(accessToken, additionalParameters) {
        const {
            authenticationService,
            loginSuccess,
            logoutSuccess,
            history,
            updateInitialFormValues,
            accessTokenFromStore
        } = this.props;

        if (!accessToken)
            accessToken = accessTokenFromStore;

        if (isTokenExpired(accessToken)) {
            this.setState({message: 'embeddingPage.tokenIsExpired'});
            logoutSuccess();
            return;
        }

        const creds = authenticationService.createCredentials(accessToken);
        if (creds) {
            loginSuccess(creds);
            updateInitialFormValues(additionalParameters);
            history.replace(indexRoute());
        }else
            this.setState({message: 'embeddingPage.notVerifiedToken'});
    }

    render() {
        return <Loading t={this.props.t} message={this.state.message} />;
    }
}

EmbeddedContainer.propTypes = {
    history: historyShape.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    logoutSuccess: PropTypes.func.isRequired,
    accessTokenFromStore: PropTypes.string.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    authenticationService: PropTypes.instanceOf(AuthenticationService).isRequired,
};

const mapStateToProps = state => ({accessTokenFromStore: state.credentials.accessToken});

export default compose(
    connect(mapStateToProps, {loginSuccess, logoutSuccess, updateInitialFormValues: updateSearchQuery}),
    withAuthenticationService,
    withApiService,
    injectT,
    withRouter
)(EmbeddedContainer);