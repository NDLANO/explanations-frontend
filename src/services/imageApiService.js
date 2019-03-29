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
        this.rawImage = `${baseUrl}/image-api/raw`;
    }

    isValidId(id) {
        try {
            return parseInt(Number(id).toString(), 10)
        }catch(e){
            return null;
        }
    }


    getById = (id) => {
        if (this.isValidId(id))
            return axios.get(`${this.apiById}/${id}`).then(x => x.data);
        else
            return {};
    };
    getByQuery = (query, page, locale) => axios.get(this.apiById, {params: {query, page, locale}}).then(x => x.data);

    getPreviewLink = (id, width=300) => {
        if (this.isValidId(id))
            return `${this.rawImage}/id/${id.replace("?width=1024", "")}?width=${width}`;
        else
            return `${this.rawImage}/${id.replace("?width=1024", "")}?width=${width}`;
    }
}