/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const getEnvironment = key => process.env[key];

export const config = {
    ENVIRONMENT:            {
        current:            getEnvironment('RUNTIME_ENV') || getEnvironment('NODE_ENV'),
        testing:            'testing',
        production:         'production',
        development:        'development',
    },
    AUTH0: {
        domain:             getEnvironment('REACT_APP_AUTH0__DOMAIN'),
        clientID:           getEnvironment('REACT_APP_AUTH0__CLIENT_ID'),
        redirectUri:        getEnvironment('REACT_APP_AUTH0__REDIRECT_URI'),
        responseType:       getEnvironment('REACT_APP_AUTH0__RESPONSE_TYPE'),
        audience:           getEnvironment('REACT_APP_AUTH0__AUDIENCE'),
        scope:              getEnvironment('REACT_APP_AUTH0__SCOPE'),
        usernameKey:        getEnvironment('REACT_APP_AUTH0__ACCESS_TOKEN_USERNAME_KEY'),
    },
    EDITORS: {
        managing:           getEnvironment('REACT_APP_EDITORS__MANAGING'),
        chief:              getEnvironment('REACT_APP_EDITORS__CHIEF')
    },
    EXTERNAL_URL: {
        concept_API:        getEnvironment('REACT_APP_EXTERNAL_URL__CONCEPT_API'),
    },
    SCOPES: {
        concept_write:      getEnvironment('REACT_APP_SCOPES__CONCEPT_WRITE'),
        concept_admin:      getEnvironment('REACT_APP_SCOPES__CONCEPT_ADMIN'),
    }
};