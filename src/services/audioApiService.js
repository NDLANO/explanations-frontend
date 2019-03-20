/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from 'axios';
import {config} from "../config";


export default class AudioApi {

    constructor(apiUrl=config.EXTERNAL_URL.ndlaApi) {
        this.apiUrl = `${apiUrl}/audio-api/v1/audio`;
    }

    getById = (id) => axios.get(`${this.apiUrl}/${id}`).then(x => x.data);
    getByQuery = (params) => axios.get(`${this.apiUrl}`, {params}).then(x => x.data);
}
