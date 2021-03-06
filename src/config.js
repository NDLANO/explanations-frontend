/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const getEnvironment = key => process.env[key];

const serverConfig = {
    CLIENT: {
        ENVIRONMENT:            getEnvironment('NODE_ENV'),
        AUTH0: {
            domain:             getEnvironment('AUTH0__DOMAIN'),
            clientID:           getEnvironment('AUTH0__CLIENT_ID'),
            redirectUri:        getEnvironment('AUTH0__REDIRECT_URI'),
            responseType:       getEnvironment('AUTH0__RESPONSE_TYPE'),
            audience:           getEnvironment('AUTH0__AUDIENCE'),
            scope:              '',//getEnvironment('AUTH0__SCOPE'),
            usernameKey:        getEnvironment('AUTH0__ACCESS_TOKEN_USERNAME_KEY'),
        },
        EXTERNAL_URL: {
            conceptApi:        getEnvironment('EXTERNAL_URL__CONCEPT_API'),
            ndlaApi:           getEnvironment('EXTERNAL_URL__NDLA_API_URL'),
            postMessage:        getEnvironment('EXTERNAL_URL__POST_MESSAGE_URL'),
        },
        SCOPES: {
            concept_write:      getEnvironment('SCOPES__CONCEPT_WRITE'),
            concept_admin:      getEnvironment('SCOPES__CONCEPT_ADMIN'),
        },
        GOOGLE: {
            searchApiKey:       getEnvironment('GOOGLE__SEARCH_API_KEY'),
            searchEngineId:     getEnvironment('GOOGLE__SEARCH_ENGINE_ID'),
            baseApiUrl:         'https://www.googleapis.com',
            youtubePlayer:      'https://www.youtube.com/embed',
        },
        BRIGHTCOVE: {
            baseApiUrl:         'https://cms.api.brightcove.com',
            accountId:          getEnvironment('BRIGHTCOVE__ACCOUNT_ID'),
            playerId:           getEnvironment('BRIGHTCOVE__PLAYER_ID'),
            player:             'https://players.brightcove.net',
        },
        VIDEO_SOURCES: {
            youtube:            'youtube',
            brightcove:         'brightcove'
        },
    },
    SERVER: {
        port:                   getEnvironment('PORT') || 3000,
        BRIGHTCOVE: {
            apiSecret:          getEnvironment('BRIGHTCOVE__SECRET'),
            clientId:           getEnvironment('BRIGHTCOVE__CLIENT_ID'),
            tokenUrl:           'https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials'
        }
    }
};

export const config =
    process.env.BUILD_TARGET === 'server'
        ? serverConfig
        : window.config;