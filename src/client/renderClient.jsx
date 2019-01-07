/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { render } from 'react-dom';
import {Provider} from "react-redux";
import {IntlProvider} from "ndla-i18n";
import {BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import {Route, Switch} from "react-router";
import { ConnectedRouter } from 'connected-react-router';

import App from '../containers/App';
import {getLocaleInfoFromPath} from "../i18n";
import configureStore from '../store';
import {catchAllRoute, loginRoute} from "../utilities/routeHelper";
import Login from "../containers/Login";
import Loading from '../containers/Loading';

import '../style/index.scss';
import ErrorBoundary from "../containers/ErrorBoundary";


const {store, persistor, history} = configureStore();

const {basename} = getLocaleInfoFromPath(window.location.pathname);

const { abbreviation, messages } = getLocaleInfoFromPath(
    window.location.pathname,
);


export const renderApp = () =>
    render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <IntlProvider locale={abbreviation} messages={messages}>
                        <PersistGate loading={<Loading />} persistor={persistor}>
                            <ErrorBoundary>
                                <BrowserRouter basename={basename}>
                                    <Switch>
                                        <Route path={loginRoute()} component={Login}/>
                                        <Route path={catchAllRoute()} component={App}/>
                                    </Switch>
                                </BrowserRouter>
                            </ErrorBoundary>
                        </PersistGate>
                    </IntlProvider>
                </ConnectedRouter>
            </Provider>
        , document.getElementById('root'));
