/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_CONCEPT_TITLES} from '../actions';

export const conceptTitles = (state=[], action) => {
    switch(action.type) {
        case UPDATE_CONCEPT_TITLES:
            return action.payload;
        default:
            return state;
    }
};