/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {  PageContainer, Content } from 'ndla-ui';
import {Route, Redirect, Switch} from 'react-router';
import {injectT} from "ndla-i18n";
import Helmet from 'react-helmet';

import './style.css'

import NotFoundPage from '../../components/NotFoundPage'
import SearchPage from '../SearchPage/SearchPageContainer';
import Footer from '../../components/Footer';
import Header from "../../components/Header/Header";
import SearchForConceptsPage from "../../components/SearchForConceptsPage";

const App = ({t}) =>
    <PageContainer>
        <Helmet
            title="NDLA"
            meta={[{ name: 'description', content: t('meta.description') }]}
        />
        <Content>
            <Header t={t} />
            <Switch>
                <Route path="/searchConcept" exact component={SearchForConceptsPage}/>
                <Route path="/search" exact component={SearchPage}/>
                <Redirect exact from="/" to="/search"/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
            <Footer t={t} />
        </Content>
    </PageContainer>;

export default injectT(App);