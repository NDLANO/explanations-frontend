/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {  PageContainer, Content } from 'ndla-ui';
import {Route, Switch, withRouter} from 'react-router';
import {injectT} from 'ndla-i18n';
import {connect} from 'react-redux';
import {compose} from 'redux';

//import 'moment/min/locales';
//import Moment from 'react-moment';

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
    notFoundRoute
} from '../../utilities/routeHelper';
import CloneConceptPage from '../Concept/CloneConceptPage';
import UpdateConceptPage from '../Concept/UpdateConceptPage';
import CreateConceptPage from '../Concept/CreateConceptPage';
import PrivateRoute from '../PrivateRoute';
import LogoutPage from '../LogoutPage';

import {loadConceptTitles, loadMeta, loadStatus} from './actions';
import {config} from "../../config";
import NotFoundPage from "../ErrorPage/NotFoundPage";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loginSuccess} from "../Login";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";
import WithEither from "../../components/HOC/WithEither";
import Loading from "../Loading";


//Moment.globalFormat = 'lll';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.renderUpdateComponent = this.renderUpdateComponent.bind(this);
    }
    componentDidMount() {
        this.loadInitialData();
    }


    loadInitialData() {
        const {apiService, loadStatus, loadConceptTitles, loadMeta} = this.props;

        apiService.getAllStatus().then(data => loadStatus(data));
        apiService.getAllConceptTitles().then(data => loadConceptTitles(data));

        const promises = [apiService.getAllCategories(), apiService.getAllMetas()];
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
                <Content>
                    <Header t={t} username={username} isLoggedIn={isAuthenticated} />
                    <Switch>
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
    loadConceptTitles: PropTypes.func.isRequired,
    loadMeta: PropTypes.func.isRequired,

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

const configIsLoaded = props => !!window.config;

export default compose(
    withRouter,
    connect(mapStateToProps, {loadMeta, loadStatus, loadConceptTitles, loginSuccess}),
    withAuthenticationService,
    withApiService,
    injectT,
    WithEither(configIsLoaded, () => <Loading message="loadingMessage.loadingConfig"/>),
)(App);
