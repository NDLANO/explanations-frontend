/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import axios from 'axios';
import {config} from "../config";
import {loginRoute, notAuthorizedRoute, notFoundRoute} from "../utilities/routeHelper";

const API_URL = `${config.EXTERNAL_URL.concept_API}/api`;

export default class ApiService {

    constructor({accessToken, history}) {
        this.accessToken = accessToken;
        this.history = history;
        this.api = axios;

        this.endpoints = {
            concept: `${API_URL}/concept`,
            meta: `${API_URL}/metadata`,
            category: `${API_URL}/category`,
            status: `${API_URL}/status`,
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
                Authorization: `Bearer ${this.accessToken}`
            }
        }
    }

    rejected = ({response}) => {
        return new Promise((resolve, reject) => {
            switch(response.status) {
                case 400:
                    if (response && response.data && response.data)
                        reject({statusCode: response.status, ...response.data.data});
                    break;
                case 401:
                    this.history.push(loginRoute());
                    break;
                case 403:
                    this.history.push(notAuthorizedRoute());
                    break;
                default:
                    this.history.push(notFoundRoute());
            }
            reject(null);
        });
    };

    getCancellationToken() {
        return axios.CancelToken.source();
    }

    searchForConcepts = query => {
        this.searchCancellationToken.cancel('Cancelled by new search');
        this.searchCancellationToken = this.getCancellationToken();
        return this.api.get(`${this.endpoints.concept}/search${query}`,
            {cancelToken: this.searchCancellationToken.token}).then(this.getData);
    };

    getConceptById      = id =>         this.api.get(`${this.endpoints.concept}/${id}`).then(this.getData).catch(this.rejected);
    getAllStatus        = () =>         this.api.get(`${this.endpoints.status}`).then(this.getData);
    getAllConceptTitles = () =>         this.api.get(`${this.endpoints.concept}/allTitles`).then(this.getData);
    getAllMetas         = () =>         this.api.get(`${this.endpoints.meta}`).then(this.getData);
    getAllCategories    = () =>         this.api.get(`${this.endpoints.category}`).then(this.getData);

    updateConcept       = concept =>    this.api.put(`${this.endpoints.concept}`,concept, this.getRequestConfig());

    createConcept       = concept =>    this.api.post(`${this.endpoints.concept}`,concept, this.getRequestConfig());

    archiveConcept      = id =>         this.api.delete(`${this.endpoints.concept}/${id}`, this.getRequestConfig());
}
