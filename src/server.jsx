/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import HTML from "./components/HTML";
import {config} from "./config";
import {getLocaleObject} from "./i18n";

const renderHtmlString = (locale) =>
    renderToString(
        <HTML lang={locale} config={{...config}} />,
    );

const server = express();

server
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('*', (req, res) => {

      const paths = req.url.split('/');
      const { abbreviation: locale } = getLocaleObject(paths[1]);
      res.status(200).send(renderHtmlString(locale));
  });

export default server;
