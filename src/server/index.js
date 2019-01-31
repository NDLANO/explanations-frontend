/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import express from 'express';
import {getLocaleObject} from "../i18n";
import {renderHtmlString} from "./renderHtmlPage";
import {getBrightcoveToken} from "./auth";

const OK = 200;
const INTERNAL_SERVER_ERROR = 500;

const app = express();

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

app.get('/get_brightcove_token', (req, res) => {
    getBrightcoveToken()
        .then(token => {
            res.send(token);
        })
        .catch(err => res.status(INTERNAL_SERVER_ERROR).send(err.message));
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
});

app.get('/health', (req, res) => {
    res.status(OK).json({ status: OK, text: 'Health check ok' });
});

app.get('*', (req, res) => {

    const paths = req.url.split('/');
    const { abbreviation: locale } = getLocaleObject(paths[1]);
    res.status(OK).send(renderHtmlString(locale));
});

export default app;