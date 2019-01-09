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
import { ConnectedRouter } from 'connected-react-router';
import { LastLocationProvider } from 'react-router-last-location';

import App from '../containers/App';
import {getLocaleInfoFromPath} from "../i18n";
import configureStore from '../store';
import Loading from '../containers/Loading';

import '../style/index.css';
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
                                    <LastLocationProvider>
                                        <App />
                                    </LastLocationProvider>
                                </BrowserRouter>
                            </ErrorBoundary>
                        </PersistGate>
                    </IntlProvider>
                </ConnectedRouter>
            </Provider>
        , document.getElementById('root'));
