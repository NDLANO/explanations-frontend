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

See ```./src/config.js``` for required environment variables.


### Code style

_tl;dr_: Use eslint! 

Lint code with [eslint](http://eslint.org/), including [eslint react plugin](https://github.com/yannickcr/eslint-plugin-react), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import), [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y#readme).
Beside linting with globally installed eslint, eslint can be invoked with `npm`:

```
$ yarn run lint
```

Rules are configured in `./.eslintrc.js` and extends [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/master/packages/eslint-config-react-app). If feeling brave, try `eslint --fix`.


react-emotion is required for ndla-audio-search