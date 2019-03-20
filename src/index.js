/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import http from 'http';
import app from './server';

import {config} from './config';

const server = http.createServer(app);

let currentApp = app;

server.listen(config.SERVER.port, error => {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started', config.SERVER.port);
});

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...');
    server.removeListener('request', currentApp);
    const newApp = require('./server').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
