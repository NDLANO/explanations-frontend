/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import { renderToString } from 'react-dom/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const head = Helmet.rewind();

const HTML = ({favicon, config, component, state}) => {
    const content = component ? renderToString(component) : '';
    return (
        <html lang={state.locale}>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            <link rel="shortcut icon" type="image/x-icon" href={favicon}/>
            {head.title.toComponent()}
            {head.meta.toComponent()}
            {head.script.toComponent()}
            {assets.client &&
            assets.client.css && (
                <link rel="stylesheet" type="text/css" href={assets.client.css} />
            )}
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic,400,600,700|Signika:400,600,300,700"
            />
        </head>
        <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
            dangerouslySetInnerHTML={{
                __html: `window.initialState = ${serialize(state)}`,
            }}
        />
        <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="false"
        />
        {config &&
        <script
            dangerouslySetInnerHTML={{
                __html: `window.config = ${serialize(config)}`,
            }}
        />
        }
        </body>
        </html>)

};

HTML.propTypes = {
    // Required
    config: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired,

    // Optional
    component: PropTypes.node,
    favicon: PropTypes.string
};

HTML.defaultProps = {
    // Optional
    favicon: '/static/ndla-favicon.png'
};


export default HTML;