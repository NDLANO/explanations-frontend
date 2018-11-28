/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {LOGIN_SUCCESS, LOGOUT} from './loginActions';

const initialState = {
    isAuthenticated: false
};

export const loginReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return state;
        default:
            return state;
    }
};