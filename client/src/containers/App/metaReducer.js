/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_LANGUAGES, UPDATE_SUBJECTS} from './Actions';

const initialState = {
    subjects: [],
    languages: []
};

export const meta = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_LANGUAGES:
            let languages = action.payload.map(item => {
                if (item.categoryName) {
                        return {id: item.id, description: item.categoryName[0]};
                    }

                });
            return {...state, languages: languages.filter(x => x)};
        case UPDATE_SUBJECTS:
            let subjects = action.payload.map(item => {
                if (item.categoryName) {
                    return {id: item.id, description: item.categoryName[0]};
                }
            });

            return {...state, subjects: subjects.filter(x => x)};
        default:
            return state;
    }
};