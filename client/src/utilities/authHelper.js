/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import auth0 from 'auth0-js';
import createHistory from 'history/createBrowserHistory';
import {config} from '../config';
import { expiresIn } from './jwtHelper';

const auth = new auth0.WebAuth({...config.AUTH0});


export const parseHash = (hash)  =>{
    return new Promise((resolve, reject) => {
        auth.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
            if (!err) {
                console.log(authResult)
                debugger
                resolve(authResult);
            } else {
                reject(err);

            }
        });
    });
};

export const loginPersonalAccessToken = (type) =>{

    auth.authorize({
        connection: type,
        clientID: config.AUTH0.clientID
    });
}


export function setAccessTokenInLocalStorage(accessToken, personal) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem(
        'access_token_expires_at',
        expiresIn(accessToken) * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token_personal', personal);
}

export const clearAccessTokenFromLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_expires_at');
    localStorage.removeItem('access_token_personal');
};

export const getAccessTokenPersonal = () =>
    localStorage.getItem('access_token_personal') === 'true';

export const getAccessTokenExpiresAt = () =>
    localStorage.getItem('access_token_expires_at')
        ? JSON.parse(localStorage.getItem('access_token_expires_at'))
        : 0;

export const getAccessToken = () => localStorage.getItem('access_token');

export const isAccessTokenValid = () =>
    new Date().getTime() < getAccessTokenExpiresAt() - 10000; // 10000ms is 10 seconds

