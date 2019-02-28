/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_METAS} from '../actions';
import {UPDATE_LOCALE} from "../../SelectLocale/actions";

const initial = [];
export const meta = (state=initial, action) => {
    switch(action.type) {
        case UPDATE_METAS:
            return action.payload;
        case UPDATE_LOCALE:
            return initial;
        default:
            return state;
    }
};