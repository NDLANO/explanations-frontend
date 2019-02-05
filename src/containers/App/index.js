/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';

import App from './AppContainer';

import {meta} from './reducers/metaReducer';
import {status} from './reducers/statusReducer';
import {mediaTypes} from "./reducers/mediaTypes";


export const appReducers = combineReducers({
    meta,
    status,
    mediaTypes
});

export default App;