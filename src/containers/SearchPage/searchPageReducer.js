/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {sortObjectsByKey} from "../../utilities/sorting";

import {SEARCH_FOR_CONCEPT, UPDATE_SEARCH_QUERY, UPDATE_IS_SEARCH} from './searchPageActions';

const initialState = {
    result: {
        items: [],
        next: null,
        page: 1,
        totalItems: 0,
        pageSize: 10,
        numberOfPages: 1,
    },
    
    searchQuery: {
        page: 1,
        language: null,
        meta: [],
        title: [],
    },
    isSearching: false,
};

export const search = (state=initialState, action) => {
    switch(action.type) {
        case SEARCH_FOR_CONCEPT:
            const {items=[], ...rest} = action.payload;
            items.sort(sortObjectsByKey('title'));
            return {...state, result: {items, ...rest}};
        case UPDATE_SEARCH_QUERY:
            return {...state, searchQuery: {...action.payload}};
        case UPDATE_IS_SEARCH:
            return {...state, isSearching: action.payload};
        default:
            return state;
    }
};