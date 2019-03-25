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
import {Switch} from "react-router";

import 'url-search-params-polyfill';

import {loginSuccess} from "../Login";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import AuthenticationService from "../../services/authenticationService";
import {historyProps} from "../../utilities/commonProps";
import {updateSearchQuery} from "../SearchPage/searchPageActions";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import {isTokenExpired} from "../../utilities/tokenHelper";
import {logoutSuccess} from "../LogoutPage";
import RoutesContainer from "../Routes/RoutesContainer";
import Loading from "../../components/Loading/LoadingComponent";


class EmbeddedContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "loadingMessage.default",
            error: false
        };
    }

    componentDidMount() {
        const {history} = this.props;
        const searchParam = new URLSearchParams(history.location.search);
        this.validateToken(searchParam.get('accessToken'));
    }

    validateToken(accessToken, ) {
        const {
            authenticationService,
            loginSuccess,
            logoutSuccess,
            accessTokenFromStore
        } = this.props;

        if (!accessToken)
            accessToken = accessTokenFromStore;

        if (isTokenExpired(accessToken)) {
            this.setState({message: 'embeddingPage.tokenIsExpired', error: true});
            logoutSuccess();
            return;
        }

        const creds = authenticationService.createCredentials(accessToken);
        if (creds) {
            loginSuccess(creds);
        }else {
            this.setState({message: 'embeddingPage.notVerifiedToken', error: true});
        }
    }

    render() {
        if (this.state.error)
            return <Loading message={this.state.message} t={this.props.t} />;
        return (
            <Switch>
                <RoutesContainer />
            </Switch>
        )
    }
}

EmbeddedContainer.propTypes = {
    history: PropTypes.shape(historyProps).isRequired,
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