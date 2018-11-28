/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'

import {locale} from './containers/SelectLocale/localeReducer';
import {search} from "./containers/SearchPage/searchPageReducer";
import {conceptReducer} from "./containers/Concept/";
import {appReducers} from './containers/App';


const rootReducers = combineReducers({
    locale,
    search,
    cacheFromServer: appReducers,
    form: formReducer,
    concept: conceptReducer
});

export default rootReducers;