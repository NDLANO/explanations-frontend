/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import auth0 from 'auth0-js';
import decode from "jwt-decode";

import {config} from '../config';

export default class AuthenticationService {
    constructor({accessToken, authProviderConfig=config.AUTH0}) {
        this.authProviderConfig = authProviderConfig;
        this.provider =  new auth0.WebAuth({...this.authProviderConfig});
        this.timeoutId = null;
    }

    cancelTimeout() {
        clearTimeout(this.timeoutId);
    }

    pollSessionForLogout(dispatchLogout) {
        // if logged out
        // dispatch logout function
        //dispatchLogout()
        if (this.timeoutId)
            this.cancelTimeout();
        const fifteen_minutes = 60 * 15;

        // TODO using NONCES
        // https://auth0.com/docs/libraries/auth0js/v9#ready-to-go-example

        this.timeoutId = setTimeout(() => {

        }, fifteen_minutes);
    }



    getScope(accessToken) {
        const decodedToken = this.decodeAccessToken(accessToken);
        if (decodedToken !== null && decodedToken.scope) {
            return decodedToken.scope.split(' ');
        }
        return [];
    }

    getCredentials(hash) {
        return this.parseHash(hash).then(authResult => {
            if (!(authResult && authResult.accessToken))
                return;

            return this.createCredentials(authResult.accessToken);

        });
    }

    createCredentials(accessToken) {
        const decodedToken = this.decodeAccessToken(accessToken);
        if (decodedToken === null)
            return;

        const credentials = {
            isAuthenticated: true,
            accessToken: accessToken
        };

        if (decodedToken[this.authProviderConfig.usernameKey])
            credentials['username'] = decodedToken[this.authProviderConfig.usernameKey];

        if (decodedToken.scope)
            credentials['scopes'] = this.getScope(accessToken);

        return credentials;
    }

    parseHash(hash) {
        return new Promise((resolve, reject) => {
            this.provider.parseHash({ hash, _idTokenVerification: false }, (err, authResult) => {
                if (!err) {
                    resolve(authResult);
                } else {
                    reject(err);

                }
            });
        });
    }

    loginUser(loginType) {
        this.provider.authorize({
            connection: loginType,
            clientID: this.authProviderConfig.clientID
        });
    }

    logoutUser() {
        this.provider.logout({
            returnTo: this.authProviderConfig.logoutUri,
            clientID: this.authProviderConfig.clientID
        });
    }

    decodeAccessToken = accessToken => {
        try {
            return decode(accessToken);
        } catch (e) {
            return null;
        }
    };

    isTokenExpired = accessToken => {
        const token = this.decodeAccessToken(accessToken);

        if (!token)
            return true;
        return new Date(token.exp*1000) < new Date();
    };

    renewAccessToken = () =>
        new Promise((resolve, reject) => {
            this.provider.renewAuth(
                {
                    redirectUri: `${this.authProviderConfig.location}/login/silent-callback`,
                    usePostMessage: true,
                },
                (err, authResult) => {
                    if (authResult && authResult.accessToken) {
                        resolve(authResult.accessToken);
                    } else {
                        reject(null);
                    }
                },
            );
})
}
