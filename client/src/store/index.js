/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { compose, createStore} from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducers from "./reducers";
import credentialsTransform from "../containers/Login/loginPersistTransform";


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['concept', 'form', 'search'],
    transforms: [credentialsTransform]
};


const persistedReducer = persistReducer(rootPersistConfig, rootReducers);

export default () => {
    let store = createStore(persistedReducer, composeEnhancers());
    let persistor = persistStore(store);
    return { store, persistor }
}