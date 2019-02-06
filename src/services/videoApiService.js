/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import 'url-search-params-polyfill';
import axios from 'axios';
import {config} from '../config';


const defaultBrightCove = {...config.BRIGHTCOVE, accessToken: '', expires: 0 };

export default class VideoApi {

    constructor(updateBrightCoveStore, google=config.GOOGLE, brightCove=defaultBrightCove) {
        this.google = google;
        this.brightCove = brightCove;
        this.updateBrightCoveStore = updateBrightCoveStore;
    }

    searchVideos = (query, type) => {
        if (type === 'youtube') {
            return this.searchYoutube(query, 'more:youtube');
        }
        return this.searchBrightCove(query);
    };

    searchYoutube = (query, filter) => {
        const params = new URLSearchParams({
            key: this.google.searchApiKey,
            cx: this.google.searchEngineId,
            q: `${query.query} ${filter}`,
            start: query.start ? query.start : undefined,
        });

        return axios.get(`${this.google.api}/customsearch/v1/?${params.toString()}`).then(x => x.data);
    };

    searchBrightCove = ({query, offset, limit}) => {
        const urlParam = new URLSearchParams({
            q: query || '',
            offset,
            limit,
        });
        const url = `${this.brightCove.apiUrl}/v1/accounts/${this.brightCove.accountId}/videos/?${urlParam.toString()}`;
        const expiresAt = this.brightCove.accessToken
            ? this.brightCove.expires
            : 0;

        const tokenIsExpired = new Date().getTime() > expiresAt || !expiresAt;

        if (!this.brightCove.accessToken || tokenIsExpired)
            return this.fetchBrightCoveAccessToken().then(x => {
                this.renewBrightCoveToken(x);
                return this.fetchWithBrightCoveToken(url);
            });
        else
            return this.fetchWithBrightCoveToken(url);
    };

    fetchWithBrightCoveToken = url => axios.get(url, {headers: { Authorization: `Bearer ${this.brightCove.accessToken}` }}).then(x => x.data);

    fetchBrightCoveAccessToken = () => axios.get('/get_brightcove_token').then(x => x.data);

    renewBrightCoveToken({access_token, expires_in}) {
        this.brightCove.accessToken = access_token;
        this.brightCove.expires = expires_in * 1000 + new Date().getTime();

        this.updateBrightCoveStore(this.brightCove.accessToken, this.brightCove.expires);
    }

    getById(id, type) {
        if (type === 'youtube') {
            return this.getByIdFromYoutube(id);
        }
        return this.getByIdFromBrightCove(id);
    }
    getByIdFromYoutube(id){
        return axios.get(`${this.google.api}/youtube/v3/videos/?${id}`).then(x => {
            if(x.data.items.length > 0)
                return x.data.items[0];
            return null;
        });
    }
    getByIdFromBrightCove(id){}
}
