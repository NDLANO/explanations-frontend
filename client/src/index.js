/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {config as configureDotEnv} from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {IntlProvider} from "ndla-i18n";
import {BrowserRouter} from "react-router-dom";

import App from './containers/App';
import {getLocaleInfoFromPath} from "./i18n";
import {store} from './store';

import './style/index.css';
import {Route, Switch} from "react-router";
import {catchAllRoute, loginRoute} from "./utilities/routeHelper";
import Login from "./containers/Login";

configureDotEnv();

const {basename} = getLocaleInfoFromPath(window.location.pathname);

const { abbreviation, messages } = getLocaleInfoFromPath(
    window.location.pathname,
);

const Client = () => (
    <Provider store={store}>
        <IntlProvider locale={abbreviation} messages={messages}>
            <BrowserRouter basename={basename}>
                <Switch>
                    <Route path={loginRoute()} component={Login}/>
                    <Route path={catchAllRoute()} component={App}/>
                </Switch>
            </BrowserRouter>
        </IntlProvider>
    </Provider>
);



ReactDOM.render(<Client />, document.getElementById('root'));
