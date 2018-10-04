/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_SEARCH_RESULTS} from './Actions';

const mock = {
    title: 'Tittelen',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    id: 1,
    externalId: 11,
    author: 'Forfatter forfatter',
    status: 'Published',
    metadata: [
        {
            id: 1,
            code: 'nn',
            description: 'Nynorsk',
            category: {
                id: 1,
                name: 'Language'
            }
        },
        {
            id: 2,
            code: 'Biologi 1',
            description: '',
            category: {
                id: 3,
                name: 'Suject'
            }
        },

    ]
}

const initialState = [mock, mock, mock];

export const searchResult = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_SEARCH_RESULTS:
            return action.payload;
        default:
            return state;
    }
};