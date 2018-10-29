/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_METAS} from './Actions';

export const meta = (state=[], action) => {
    switch(action.type) {
        case UPDATE_METAS:
            return action.payload;
        default:
            return state;
    }
};