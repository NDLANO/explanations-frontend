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

import './style.css'

import NotFoundPage from '../../components/NotFoundPage'
import SearchPage from '../SearchPage/SearchPageContainer';
import Footer from '../../components/Footer';
import Header from "../../components/Header/Header";
import {CreateRoute, SearchRoute, UpdateRoute, CloneRoute} from "../../routes";
import {loadMeta, loadStatus} from "./Actions";
import {connect} from "react-redux";
import {compose} from "redux";
import {CloneConceptPage, UpdateConceptPage, CreateConceptPage} from "../CRUD";

class App extends React.Component {
    componentDidMount() {
        this.props.loadMeta();
        this.props.loadStatus();
    }

    render() {
        const {t} = this.props;
        return (
            <PageContainer>
                <Content>
                    <Header t={t} />
                    <Switch>
                        <Route path={SearchRoute} exact component={SearchPage}/>
                        <Route path={UpdateRoute} exact component={UpdateConceptPage}/>
                        <Route path={CreateRoute} exact component={CreateConceptPage}/>
                        <Route path={CloneRoute} exact component={CloneConceptPage}/>
                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                    <Footer t={t} />
                </Content>
            </PageContainer>
        )
    }
}


export default compose(
    withRouter,
    connect(null, {loadMeta, loadStatus}),
    injectT,
)(App);
