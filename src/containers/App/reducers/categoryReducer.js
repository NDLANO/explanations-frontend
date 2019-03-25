/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { UPDATE_CATEGORIES} from '../actions';
import {UPDATE_LOCALE} from "../../SelectLocale/actions";

const initial = [];
export const categories = (state=initial, action) => {
    switch(action.type) {
        case UPDATE_CATEGORIES:
            return action.payload;
        case UPDATE_LOCALE:
            return initial;
        default:
            return state;
    }
};