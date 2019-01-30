/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from "axios";

export default class ImageApi {
    constructor(baseUrl) {
        this.apiUrl = `${baseUrl}/image-api/v2/images`;
    }

    getById = (id) => axios.get(`${this.apiUrl}/${id}`).then(x => x.data);
    getByQuery = (query, page, locale) => axios.get(this.apiUrl, {params: {query, page, locale}}).then(x => x.data);
}