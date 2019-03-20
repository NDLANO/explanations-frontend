/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from 'axios';
import {loginRoute, notAuthorizedRoute, notFoundRoute} from "../utilities/routeHelper";


export default class ApiService {

    constructor({accessToken, history, apiUrl, locale}) {
        this.accessToken = accessToken;
        this.history = history;
        this.api = axios;
        this.language = locale;
        this.apiUrl = `${apiUrl}/api/v1`;
        this.endpoints = {
            concept: `${this.apiUrl}/concept`,
            meta: `${this.apiUrl}/metadata`,
            category: `${this.apiUrl}/category`,
            status: `${this.apiUrl}/status`,
            mediaType: `${this.apiUrl}/mediatype`,
        };

        this.searchCancellationToken = this.getCancellationToken();
    }

    getData = response => {
        return new Promise((resolve, reject) => {
            if (response && response.data && response.data)
                resolve(response.data.data);
            else
                reject(null);
        });
    };

    getRequestConfig() {
        return {
            headers: {
                "Content-Type": 'application/json'
            },
            data: {}
        }
    }
    getRequestConfigWithAuth() {
        return {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                ...this.getRequestConfig().headers
            }
        }
    }

    rejected = ({response}) => {
        return new Promise((resolve, reject) => {
            switch(response.status) {
                case 401:
                    this.history.push(loginRoute());
                    break;
                case 403:
                    this.history.push(notAuthorizedRoute());
                    break;
                case 404:
                    this.history.push(notFoundRoute());
                    break;
                default:
                    break;
            }
            reject(response.data);
        });
    };

    getCancellationToken() {
        return axios.CancelToken.source();
    }

    searchForConcepts = query => {
        this.searchCancellationToken.cancel('Cancelled by new search');
        this.searchCancellationToken = this.getCancellationToken();
        return this.api.get(`${this.endpoints.concept}/search?${query}`,
            {cancelToken: this.searchCancellationToken.token}).then(this.getData);
    };

    getById    = (id, url) =>           this.api.get(`${url}/${id}`, this.getRequestConfig()).then(this.getData).catch(this.rejected);
    get        = (url, params='') =>    this.api.get(`${url}?${params}`, this.getRequestConfig()).then(this.getData).catch(this.rejected);

    update     = (concept, url) =>      this.api.put(url,concept, this.getRequestConfigWithAuth()).catch(this.rejected);

    create     = (concept, url) =>      this.api.post(url,concept, this.getRequestConfigWithAuth()).catch(this.rejected);

    delete     = (id, url) =>           this.api.delete(`${url}/${id}`, this.getRequestConfigWithAuth()).catch(this.rejected);
}
