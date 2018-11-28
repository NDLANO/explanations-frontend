Need a .env file in ./client with keys:
> REACT_APP_AUTH0_DOMAIN
> REACT_APP_AUTH0_CLIENT_ID  
> REACT_APP_AUTH0_REDIRECT_URI  
> REACT_APP_AUTH0_RESPONSE_TYPE  
> REACT_APP_AUTH0_AUDIENCE  
> REACT_APP_AUTH0_SCOPE  


Concepts (create, update, and clone) needs each their reducer and flash message because we are redirecting from clone and create to update, and if we only had a global flash message then i would persist if we navigated awayf rom create page to search, but also from create to update,
or it wopuld not persist on navigation I.E on navigate from create to update the message would be reset..

