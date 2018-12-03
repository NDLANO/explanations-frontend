/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {LOGIN_SUCCESS} from './loginActions';
import {LOGOUT_SUCCESS} from "../LogoutPage";

export const initialState = {
    isAuthenticated: false,
    accessToken: "",
    username: "",
    scopes: []
};

export const loginReducer = (state=initialState, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {...state, ...action.payload};
        case LOGOUT_SUCCESS:
            return {...state, ...initialState};
        default:
            return state;
    }
};