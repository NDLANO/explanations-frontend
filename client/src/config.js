const getEnvironment = key => process.env[key];

export const config = {
    ENVIRONMENT:            getEnvironment('RUNTIME_ENV') || getEnvironment('NODE_ENV'),
    AUTH0: {
        domain:             getEnvironment('REACT_APP_AUTH0__DOMAIN'),
        clientID:           getEnvironment('REACT_APP_AUTH0__CLIENT_ID'),
        redirectUri:        getEnvironment('REACT_APP_AUTH0__REDIRECT_URI'),
        responseType:       getEnvironment('REACT_APP_AUTH0__RESPONSE_TYPE'),
        audience:           getEnvironment('REACT_APP_AUTH0__AUDIENCE'),
        scope:              getEnvironment('REACT_APP_AUTH0__SCOPE'),
        usernameKey:        getEnvironment('REACT_APP_AUTH0__ACCESS_TOKEN_USERNAME_KEY'),
        logoutUri:          getEnvironment('REACT_APP_AUTH0__LOGOUT_URI'),
    },
    EDITORS: {
        managing:           getEnvironment('REACT_APP_EDITORS__MANAGING'),
        chief:              getEnvironment('REACT_APP_EDITORS__CHIEF')
    },
    EXTERNAL_URL: {
        consent_NDLA:       getEnvironment('REACT_APP_EXTERNAL_URL__CONSENT')
    },
    SCOPES: {
        concept_write: getEnvironment('REACT_APP_SCOPES__CONCEPT_WRITE'),
        concept_admin: getEnvironment('REACT_APP_SCOPES__CONCEPT_ADMIN'),
    }
};

