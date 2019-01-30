/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from 'axios';


export default class NDLAApiService {

    constructor(apiUrl, onError) {
        this.apiUrl = `${apiUrl}`;
        this.onError = onError;
    }

    getById = (id) => axios.get(`${this.apiUrl}/${id}`).then(x => x.data);
    getByQuery = (params) => axios.get(`${this.apiUrl}`, {params}).then(x => x.data);
}
