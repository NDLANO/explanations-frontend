/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { UPDATE_STATUS} from '../actions';

export const status = (state=[], action) => {
    switch(action.type) {
        case UPDATE_STATUS:
            return action.payload;
        default:
            return state;
    }
};