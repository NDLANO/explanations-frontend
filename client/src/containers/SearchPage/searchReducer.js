/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {SEARCH_FOR_CONCEPT} from './Actions';

const initialState = {
    results: [],
};

export const search = (state=initialState, action) => {
    switch(action.type) {
        case SEARCH_FOR_CONCEPT:
            return {...state, results: action.payload.data};
        default:
            return state;
    }
};