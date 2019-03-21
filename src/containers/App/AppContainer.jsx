/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch, withRouter} from 'react-router';
import {connect} from 'react-redux';
import {compose} from 'redux';

/* eslint-disable no-unused-vars */
import * as moment from 'moment';
/* eslint-enable no-unused-vars */
import 'moment/locale/en-gb';
import 'moment/locale/nb';
import 'moment/locale/nn';
import Moment from 'react-moment';

import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loginSuccess, updateNext} from "../Login";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import Routes from '../Routes';
import Page from '../Page';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundaryContainer";

import {loadMediaTypes, loadMeta, loadStatus} from './actions';


import 'url-search-params-polyfill';
import {
    embeddedRoute,
    indexRoute,
    loginRoute,
    logoutRoute,
    notAuthorizedRoute, notFoundRoute,
    siteRoute
} from "../../utilities/routeHelper";
import Login from "../Login";
import LogoutPage from "../LogoutPage";
import NotAuthorizedPage from "../ErrorPage/NotAuthorized";
import NotFoundPage from "../ErrorPage/NotFoundPage";

Moment.globalFormat = 'lll';


class App extends React.Component {
    componentDidMount() {
        const {apiService, loadStatus, loadMeta, loadMediaTypes, locale} = this.props;
        this.loadData(apiService, loadStatus, loadMeta, loadMediaTypes, locale);
    }

    loadData(apiService, loadStatus, loadMeta, loadMediaTypes, locale) {
        const searchParams = new URLSearchParams();
        searchParams.append('language', locale);
        searchParams.append('pageSize', '100');
        searchParams.append('page', '1');
        const param = searchParams.toString();

        apiService.get(apiService.endpoints.status, param).then(data => loadStatus(data.results));
        apiService.get(apiService.endpoints.mediaType, param).then(data => loadMediaTypes(data.results));
        apiService.get(apiService.endpoints.meta, param).then(data => loadMeta(data.results));
    }


    render() {
        return (
                <ErrorBoundary>
                    <Switch>
                        <Route path={embeddedRoute()} component={Routes} />
                        <Route path={siteRoute()} component={Page} />
                        <Route path={loginRoute()} component={Login}/>
                        <Route path={logoutRoute()} component={LogoutPage}/>
                        <Route path={notAuthorizedRoute()} component={NotAuthorizedPage}/>
                        <Route path={notFoundRoute()} component={NotFoundPage}/>
                        <Route exact path={indexRoute()} render={() => <Redirect to="/site"/>}/>
                    </Switch>
                </ErrorBoundary>
        )
    }
}

App.propTypes = {
    // Required
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    loadStatus: PropTypes.func.isRequired,
    loadMeta: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loadMediaTypes: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    const token = state.credentials.accessToken;
    return {
        locale: state.locale,
        accessToken: token,
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {loadMeta, loadStatus, loadMediaTypes, loginSuccess, updateNext}),
    withAuthenticationService,
    withApiService,
)(App);
