/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from "axios";
import {config} from "../config";

export default class ImageApi {
    constructor(baseUrl=config.EXTERNAL_URL.ndlaApi) {
        this.baseUrl = `${baseUrl}/image-api`;
        this.apiById = `${this.baseUrl}/v2/images`;
        this.apiByName = `${baseUrl}/image-api/raw`;
    }


    getById = (id) => axios.get(`${this.apiUrl}/${id}`).then(x => x.data);
    getByQuery = (query, page, locale) => axios.get(this.apiById, {params: {query, page, locale}}).then(x => x.data);

    getPreviewLink = (id, width=400) => {
        let externalId = null;
        try {
            externalId = parseInt(Number(id).toString(), 10)
        }catch(e){}

        if (externalId)
            return `${this.baseUrl}/raw/id/${id.replace("?width=1024", "")}?width=${width}`;
        else
            return `${this.baseUrl}/raw/${id.replace("?width=1024", "")}?width=${width}`;
    }
}