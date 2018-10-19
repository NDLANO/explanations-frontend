/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_LANGUAGES, UPDATE_LICENCES, UPDATE_SUBJECTS} from './Actions';

const initialState = {
    subjects: [],
    languages: [],
    licences: []
};

export const meta = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_LANGUAGES:
            return {...state, languages: action.payload};
        case UPDATE_SUBJECTS:
            return {...state, subjects: action.payload};
        case UPDATE_LICENCES:
            return {...state, licences: action.payload};
        default:
            return state;
    }
};