/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { UPDATE_MEDIA_TYPES} from '../actions';

export const mediaTypes = (state=[], action) => {
    switch(action.type) {
        case UPDATE_MEDIA_TYPES:
            return action.payload;
        default:
            return state;
    }
};