/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {IntlProvider} from "ndla-i18n";
import {BrowserRouter} from "react-router-dom";
import App from './containers/App/App';
import {getLocaleInfoFromPath, isValidLocale} from "./i18n";
import {store} from './store';

const paths = window.location.pathname.split('/');
const basename = isValidLocale(paths[1]) ? `${paths[1]}` : '';

const { abbreviation, messages } = getLocaleInfoFromPath(
    window.location.pathname,
);

const Client = () => (
    <Provider store={store}>
        <IntlProvider locale={abbreviation} messages={messages}>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </IntlProvider>
    </Provider>
);



ReactDOM.render(<Client />, document.getElementById('root'));
