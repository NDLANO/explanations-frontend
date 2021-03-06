/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {getLocaleInfoFromPath} from "../../i18n";
import {UPDATE_LOCALE} from './actions';
const {abbreviation} = getLocaleInfoFromPath(window.location.pathname);

const initialState = abbreviation;

export const locale = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_LOCALE:
            return action.payload;
        default:
            return state;
    }
};