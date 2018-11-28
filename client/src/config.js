
console.log(process.env)
const getEnvironment = key => process.env[key];

export const config = {
    ENVIRONMENT:            getEnvironment('RUNTIME_ENV') || getEnvironment('NODE_ENV'),
    AUTH0: {
        domain:             getEnvironment('REACT_APP_AUTH0_DOMAIN'),
        clientID:           getEnvironment('REACT_APP_AUTH0_CLIENT_ID'),
        redirectUri:        getEnvironment('REACT_APP_AUTH0_REDIRECT_URI'),
        responseType:       getEnvironment('REACT_APP_AUTH0_RESPONSE_TYPE'),
        audience:           getEnvironment('REACT_APP_AUTH0_AUDIENCE'),
        scope:              getEnvironment('REACT_APP_AUTH0_SCOPE'),
    },
    EDITORS: {
        managing: "Pål Frønsdal",
        chief: "Christer Gundersen"
    }
};

