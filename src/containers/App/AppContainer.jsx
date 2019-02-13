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
    createRoute,
    searchRoute,
    updateRoute,
    cloneRoute,
    catchAllRoute,
    logoutRoute,
    notAuthorizedRoute,
    notFoundRoute, loginRoute, embeddedRoute
} from '../../utilities/routeHelper';
import CloneConceptPage from '../Concept/CloneConceptPage';
import UpdateConceptPage from '../Concept/UpdateConceptPage';
import CreateConceptPage from '../Concept/CreateConceptPage';
import PrivateRoute from '../PrivateRoute';
import LogoutPage from '../LogoutPage';
import {config} from "../../config";
import NotFoundPage from "../ErrorPage/NotFoundPage";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loginSuccess, updateNext} from "../Login";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import ErrorBoundary from "../ErrorBoundary";
import Login from "../Login";
import EmbeddedPage from "../EmbeddedPage";

import {loadMediaTypes, loadMeta, loadStatus} from './actions';

Moment.globalFormat = 'lll';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.renderUpdateComponent = this.renderUpdateComponent.bind(this);
    }
    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData() {
        const {apiService, loadStatus, loadMeta, loadMediaTypes} = this.props;

        apiService.get(apiService.endpoints.status).then(data => loadStatus(data));
        apiService.get(apiService.endpoints.mediaType).then(data => loadMediaTypes(data));

        const promises = [apiService.get(apiService.endpoints.category), apiService.get(apiService.endpoints.meta)];
        Promise.all(promises).then(([categories, metas]) => loadMeta(categories, metas));
    }

    renderUpdateComponent(){
        return <UpdateConceptPage requiredScopes={this.props.updatePageRequiredScope} />;
    }

    render() {
        const {
            t,
            username,
            isAuthenticated,
            clonePageRequiredScope,
            createPageRequiredScope
        } = this.props;
        return (
            <PageContainer>
                <Helmet title={t('pageTitles.default')} />
                <Content>
                    <Header t={t} username={username} isLoggedIn={isAuthenticated} />
                    <ErrorBoundary>
                        <Switch>
                            <Route path={loginRoute()} component={Login}/>
                            <Route path={embeddedRoute()} component={EmbeddedPage}/>
                            <Route path={updateRoute()} render={this.renderUpdateComponent}/>
                            <PrivateRoute requiredScopes={createPageRequiredScope}
                                          path={createRoute()}
                                          component={CreateConceptPage}/>
                            <PrivateRoute requiredScopes={clonePageRequiredScope}
                                          path={cloneRoute()}
                                          component={CloneConceptPage}/>
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
    clonePageRequiredScope: PropTypes.arrayOf(PropTypes.string).isRequired,
    createPageRequiredScope: PropTypes.arrayOf(PropTypes.string).isRequired,
    updatePageRequiredScope: PropTypes.arrayOf(PropTypes.string).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    loadStatus: PropTypes.func.isRequired,
    loadMeta: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    loadMediaTypes: PropTypes.func.isRequired,
    // Optional
    username: PropTypes.string,
};

const mapStateToProps = state => {
    const token = state.credentials.accessToken;
    const createConceptRequiredScope = [config.SCOPES.concept_write, config.SCOPES.concept_admin];
    return {
        accessToken: token,
        username: state.credentials.username,
        isAuthenticated: state.credentials.isAuthenticated,
        updatePageRequiredScope: createConceptRequiredScope,
        createPageRequiredScope: createConceptRequiredScope,
        clonePageRequiredScope: createConceptRequiredScope,
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, {loadMeta, loadStatus, loadMediaTypes, loginSuccess, updateNext}),
    withAuthenticationService,
    withApiService,
    injectT,
)(App);
