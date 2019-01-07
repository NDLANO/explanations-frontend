/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = payload => ({type: LOGIN_SUCCESS, payload});


export const UPDATE_NEXT = 'UPDATE_NEXT';
export const updateNext = (payload='') => ({type: UPDATE_NEXT, payload});