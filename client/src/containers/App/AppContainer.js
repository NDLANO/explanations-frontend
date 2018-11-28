/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {  PageContainer, Content } from 'ndla-ui';
import {Route, Switch, withRouter} from 'react-router';
import {injectT} from "ndla-i18n";
import {connect} from "react-redux";
import {compose} from "redux";


//import "moment/min/locales";
//import Moment from 'react-moment';

import NotFoundPage from '../NotFoundPage'
import SearchPage from '../SearchPage/SearchPageContainer';
import Footer from '../../components/Footer';
import Header from '../../components/Header/';
import {createRoute, searchRoute, updateRoute, cloneRoute, loginRoute, catchAllRoute} from "../../utilities/routeHelper";
import CloneConceptPage from "../Concept/CloneConceptPage";
import UpdateConceptPage from "../Concept/UpdateConceptPage";
import CreateConceptPage from "../Concept/CreateConceptPage";
import Login from "../Login";


import {loadConceptTitles, loadMeta, loadStatus} from "./actions";
import ApiClient from "../../api";


//Moment.globalFormat = 'lll';

class App extends React.Component {
    componentDidMount() {
        this.loadInitialData();
    }
    loadInitialData() {
        this.props.apiClient.getAllStatus().then(data => this.props.loadStatus(data));
        this.props.apiClient.getAllConceptTitles().then(data => this.props.loadConceptTitles(data));
        const promises = [this.props.apiClient.getAllCategories(), this.props.apiClient.getAllMetas()];
        Promise.all(promises).then(([categories, metas]) => this.props.loadMeta(categories, metas));
    }

    render() {
        const {t} = this.props;
        return (
            <PageContainer>
                <Content>
                    <Header t={t} />
                    <Switch>
                        <Route path={updateRoute()} component={UpdateConceptPage}/>
                        <Route path={createRoute()} component={CreateConceptPage}/>
                        <Route path={cloneRoute()} component={CloneConceptPage}/>
                        <Route path={loginRoute()} component={Login}/>
                        <Route path={searchRoute()} component={SearchPage}/>
                        <Route path={catchAllRoute()} component={NotFoundPage}/>
                    </Switch>
                    <Footer t={t} />
                </Content>
            </PageContainer>
        )
    }
}


const mapStateToProps = state => {
    const token = "token";

    return {
        apiClient: new ApiClient(token),
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {loadMeta, loadStatus, loadConceptTitles}),
    injectT,
)(App);
