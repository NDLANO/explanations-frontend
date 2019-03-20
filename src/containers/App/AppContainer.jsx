/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {  PageContainer, Content } from '@ndla/ui';
import {Route, Switch, withRouter} from 'react-router';
import {injectT} from '@ndla/i18n';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Helmet} from "react-helmet";

/* eslint-disable no-unused-vars */
import * as moment from 'moment';
/* eslint-enable no-unused-vars */
import 'moment/locale/en-gb';
import 'moment/locale/nb';
import 'moment/locale/nn';
import Moment from 'react-moment';

import NotAuthorizedPage from '../ErrorPage/NotAuthorized'
import SearchPage from '../SearchPage/SearchPageContainer';
import Footer from '../../components/Footer';
import Header from '../../components/Header/';
import {
    searchRoute,
    catchAllRoute,
    logoutRoute,
    notAuthorizedRoute,
    notFoundRoute,
    loginRoute,
    embeddedRoute,
    conceptRoute
} from '../../utilities/routeHelper';
import LogoutPage from '../LogoutPage';
import NotFoundPage from "../ErrorPage/NotFoundPage";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loginSuccess, updateNext} from "../Login";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import ErrorBoundary from "../ErrorBoundary";
import Login from "../Login";
import EmbeddedPage from "../EmbeddedPage";

import {loadMediaTypes, loadMeta, loadStatus} from './actions';

import ConceptPage from '../Concept/';


import 'url-search-params-polyfill';

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
        const {
            t,
            username,
            isAuthenticated,
        } = this.props;
        return (
            <PageContainer>
                <Helmet title={t('pageTitles.default')} />
                <Content>
                    <Header t={t} username={username} isLoggedIn={isAuthenticated} />
                    <ErrorBoundary>
                        <Switch>
                            <Route path={conceptRoute()} component={ConceptPage}/>
                            <Route path={loginRoute()} component={Login}/>
                            <Route path={embeddedRoute()} component={EmbeddedPage}/>
                            <Route path={logoutRoute()} component={LogoutPage}/>
                            <Route path={notAuthorizedRoute()} component={NotAuthorizedPage}/>
                            <Route path={notFoundRoute()} component={NotFoundPage}/>
                            <Route path={searchRoute()} exact component={SearchPage}/>
                            <Route path={catchAllRoute()} component={NotFoundPage}/>
                        </Switch>
                        <Footer t={t} />
                    </ErrorBoundary>
                </Content>
            </PageContainer>
        )
    }
}

App.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    loadStatus: PropTypes.func.isRequired,
    loadMeta: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loadMediaTypes: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,

    // Optional
    username: PropTypes.string,
};

const mapStateToProps = state => {
    const token = state.credentials.accessToken;
    return {
        locale: state.locale,
        accessToken: token,
        username: state.credentials.username,
        isAuthenticated: state.credentials.isAuthenticated,
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {loadMeta, loadStatus, loadMediaTypes, loginSuccess, updateNext}),
    withAuthenticationService,
    withApiService,
    injectT,
)(App);
