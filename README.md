Concepts (create, update, and clone) needs each their reducer and flash message because we are redirecting from clone and create to update, and if we only had a global flash message then i would persist if we navigated awayf rom create page to search, but also from create to update,
or it wopuld not persist on navigation I.E on navigate from create to update the message would be reset..

## Setup
Need a .env file in ./client with keys:

``` yaml
# Auth0 specific
REACT_APP_AUTH0__DOMAIN=
REACT_APP_AUTH0__CLIENT_ID=
REACT_APP_AUTH0__REDIRECT_URI= # Origin ie http://localhost:300 or https://example.com
REACT_APP_AUTH0__RESPONSE_TYPE=
REACT_APP_AUTH0__AUDIENCE=
REACT_APP_AUTH0__SCOPE=
REACT_APP_AUTH0__ACCESS_TOKEN_USERNAME_KEY=

# Editors for footer
REACT_APP_EDITORS__CHIEF=
REACT_APP_EDITORS__MANAGING=

# External urls
REACT_APP_EXTERNAL_URL__CONSENT=
REACT_APP_EXTERNAL_URL__CONCEPT_API=

# Scopes
REACT_APP_SCOPES__CONCEPT_WRITE=
REACT_APP_SCOPES__CONCEPT_ADMIN=
```
