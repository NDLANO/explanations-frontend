/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {UPDATE_FLASH_MESSAGE} from './flashMessageActions';

const initialState = {
    message: '',
    title: '',
    severity: ''
};

export const flashMessage = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_FLASH_MESSAGE:
            return action.payload;
        default:
            return state;
    }
};