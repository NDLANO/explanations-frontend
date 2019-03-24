/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from 'axios';
import btoa from 'btoa';
import {config} from '../config'

const b64EncodeUnicode = str =>
    btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
            String.fromCharCode(`0x${p1}`),
        ),
    );

export const getBrightcoveToken = () => {
    const clientIdSecret = `${config.SERVER.BRIGHTCOVE.clientId}:${config.SERVER.BRIGHTCOVE.apiSecret}`;
    return axios({
        url: config.SERVER.BRIGHTCOVE.tokenUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            Authorization: `Basic ${b64EncodeUnicode(clientIdSecret)}`,
        },
        body: 'grant_type=client_credentials',
    }).then(x => x.data);
};


export const Auth0SilentCallback = `
  <html lang="no">
    <head >
    <body>
      <script src="https://cdn.auth0.com/js/auth0/9.8.0/auth0.min.js"></script>
      <script type="text/javascript">
        var webAuth = new auth0.WebAuth({
          domain: '${config.CLIENT.AUTH0.domain}',
          clientID: '${config.CLIENT.AUTH0.clientID}'
        });
        var result = webAuth.parseHash({ hash: window.location.hash }, function(err, data) {
          parent.postMessage(err || data, window.location.origin);
        });
      </script>
    </body>
  </html>
  `;