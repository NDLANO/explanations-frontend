/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {sortObjectsByKey} from "../../utilities/sorting";

import {SEARCH_FOR_CONCEPT} from './searchPageActions';

const initialState = {
    results: [],
    autocompleteTitles: []
};

export const search = (state=initialState, action) => {
    switch(action.type) {
        case SEARCH_FOR_CONCEPT:
            let results = action.payload.sort(sortObjectsByKey('title'));
            let autocompleteTitles = results.map(x => x.title);
            return {...state, results, autocompleteTitles};
        default:
            return state;
    }
};