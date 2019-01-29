# NDLA Explanations and terms frontend

System for producing content for NDLA

## Requirements

- Node.JS 10.14.2
- yarn ~1.7.0
- Docker (optional)

## Getting started

What's in the box?

- React
- Redux
- [Razzle](https://github.com/jaredpalmer/razzle)

### Dependencies

All dependencies are defined in `package.json` and are managed with npm/yarn. To
initially install all dependencies and when the list dependency has changed,
run `yarn install`.

```
$ yarn install
```

### Start development server

Start node server with hot reloading middleware listening on port 3000.

```
$ yarn start
```

#### Environment variables  
> To set environment variables, create a .env file in the root directory with the following values

Login variables
```
REACT_APP_AUTH0__DOMAIN
REACT_APP_AUTH0__CLIENT_ID
REACT_APP_AUTH0__REDIRECT_URI
REACT_APP_AUTH0__RESPONSE_TYPE
REACT_APP_AUTH0__AUDIENCE
REACT_APP_AUTH0__SCOPE
```

Key to fetch username from jwt
```
REACT_APP_AUTH0__ACCESS_TOKEN_USERNAME_KEY
```

Enabling scopes for read and write towards the database:
```
REACT_APP_SCOPES__CONCEPT_WRITE
REACT_APP_SCOPES__CONCEPT_ADMIN
```

To use a different api set:
```
REACT_APP_EXTERNAL_URL__CONCEPT_API
```


### Code style

_tl;dr_: Use eslint! 

Lint code with [eslint](http://eslint.org/), including [eslint react plugin](https://github.com/yannickcr/eslint-plugin-react), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme).
Beside linting with globally installed eslint, eslint can be invoked with `npm`:

```
$ yarn run lint
```

Rules are configured in `./.eslintrc.js` and extends [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app). If feeling brave, try `eslint --fix`.
