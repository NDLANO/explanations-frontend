/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';

import {createConceptReducer} from './CreateConceptPage/'
import {updateConceptReducer} from './UpdateConceptPage/';
import {cloneConceptReducer} from "./CloneConceptPage";


export const conceptReducer = combineReducers({
    create: createConceptReducer,
    update: updateConceptReducer,
    clone: cloneConceptReducer,
});