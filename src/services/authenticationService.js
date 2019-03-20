/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import auth0 from 'auth0-js';
import {decodeAccessToken, getScope} from "../utilities/tokenHelper";

export default class AuthenticationService {
    constructor({accessToken, authProviderConfig}) {
        this.authProviderConfig = authProviderConfig;

        const {redirectUri} = this.authProviderConfig;
        this.provider =  new auth0.WebAuth({...this.authProviderConfig, redirectUri: `${redirectUri}/login/success`});
    }

    getCredentials(hash) {
        return this.parseHash(hash).then(authResult => {
            if (!(authResult && authResult.accessToken))
                return;

            return this.createCredentials(authResult.accessToken);

        });
    }

    createCredentials(accessToken) {
        const decodedToken = decodeAccessToken(accessToken);
        if (decodedToken === null)
            return;

        const credentials = {
            isAuthenticated: true,
            accessToken: accessToken,
        };

        if (decodedToken[this.authProviderConfig.usernameKey])
            credentials['username'] = decodedToken[this.authProviderConfig.usernameKey];

        if (decodedToken.scope)
            credentials['scopes'] = getScope(accessToken);

        return credentials;
    }

    parseHash(hash) {
        return new Promise((resolve, reject) => {
            this.provider.parseHash({ nonce: this.nonce,hash, _idTokenVerification: false }, (err, authResult) => {
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
            returnTo: this.authProviderConfig.redirectUri,
            clientID: this.authProviderConfig.clientID
        });
    }
}
