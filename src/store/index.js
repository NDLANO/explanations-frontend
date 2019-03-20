/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import {applyMiddleware, compose, createStore} from 'redux';
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'

import credentialsTransform from "../containers/Login/loginPersistTransform";

import rootReducers from "./reducers";

const history = createBrowserHistory();

const middleware = applyMiddleware(
    routerMiddleware(history),
    );

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['concept', 'form', 'search', 'router', 'locale'],
    transforms: [credentialsTransform]
};

const {initialState} = window;
const persistedReducer = persistReducer(rootPersistConfig, rootReducers(history));

export default () => {
    let store = createStore(persistedReducer, initialState, composeEnhancers(middleware));
    let persistor = persistStore(store);
    return { store, persistor, history}
}