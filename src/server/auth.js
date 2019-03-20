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