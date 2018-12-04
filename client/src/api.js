/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { push } from 'connected-react-router'
import axios from 'axios';
import {config} from "./config";
import {AuthenticationService} from "./services/authenticationService";
import {loginRoute, notAuthorizedRoute, notFoundRoute} from "./utilities/routeHelper";

const getUrlBasedOnEnvironment = env => {
    switch (env) {
        case config.ENVIRONMENT.development:
            return 'http://localhost:63365';
        case config.ENVIRONMENT.testing:
            return 'http://ndla-api-testing-777208375.eu-west-1.elb.amazonaws.com';
        case config.ENVIRONMENT.production:
            return 'http://ndla-api-1275813378.eu-west-1.elb.amazonaws.com';
        default:
            return 'COULD_NOT_READ_URL_FROM_ENVIRONMENT';
    }
};

const ROOT_URL = getUrlBasedOnEnvironment(config.ENVIRONMENT.current);

const API_URL = `${ROOT_URL}/api`;

export default class ApiClient {

    constructor(dispatch,token="notValidToken", authService = new AuthenticationService()) {
        this.dispatch = dispatch;
        this.authenticationService = authService;
        this.api = axios.create({
            headers: {
                common: {  // Common is for all types requests (post, get etc)
                    Authorization: `Bearer ${token}`
                }
            }
        });
/*


        this.api.interceptors.response.use(
            response => response,
            error => {
                const {status} = error.response;
                if (status === 401) {

                }
                return Promise.reject(error);
            }
 */

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

    rejected = ({response}) => {
        return new Promise((resolve, reject) => {

            push(loginRoute());
            switch(response.status) {
                case 400:
                    if (response && response.data && response.data)
                        reject({statusCode: response.status, ...response.data.data});
                    break;
                case 401:
                    this.dispatch(push(loginRoute()));
                    break;
                case 403:
                    this.dispatch(push(notAuthorizedRoute()));
                    break;
                default:
                    this.dispatch(push(notFoundRoute()));
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

    updateConcept       = concept =>    this.api.put(`${this.endpoints.concept}`,concept);

    createConcept       = concept =>    this.api.post(`${this.endpoints.concept}`,concept);

    archiveConcept      = id =>         this.api.delete(`${this.endpoints.concept}/${id}`,);
}
