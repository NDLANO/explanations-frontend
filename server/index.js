'use strict';

const express = require('express');
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const CLIENT_BUILD_PATH = path.join(__dirname, './client/build');

// App
const app = express();

// Static files
app.use(express.static(CLIENT_BUILD_PATH));

// API
app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    let data = {
        message: 'Hello world, Woooooeeeee!!!!'
    };
    res.send(JSON.stringify(data, null, 2));
});

app.get('/test', function(request, response) {

    console.log("REACT page");
    response.send(JSON.stringify({chief: process.env['REACT_APP_EDITORS__MANAGING']}));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {

    console.log("REACT page");
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);