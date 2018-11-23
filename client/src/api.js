/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import axios from 'axios';


const ENVIRONMENT_PRODUCTION = "production";
const ENVIRONMENT_TESTING = "testing";
const ENVIRONMENT_DEVELOPMENT = "development";

const getUrlBasedOnEnvironment = env => {
    switch (env) {
        case ENVIRONMENT_DEVELOPMENT:
            return 'http://localhost:63365';
        case ENVIRONMENT_TESTING:
            return 'http://ndla-api-testing-777208375.eu-west-1.elb.amazonaws.com';
        case ENVIRONMENT_PRODUCTION:
            return 'http://ndla-api-1275813378.eu-west-1.elb.amazonaws.com';
        default:
            return 'COULD_NOT_READ_URL_FROM_ENVIRONMENT';
    }
};

const ROOT_URL = getUrlBasedOnEnvironment(process.env['RUNTIME_ENV'] || process.env['NODE_ENV']);

const API_URL = `${ROOT_URL}/api`;

const API_ENDPOINTS = {
    concept: `${API_URL}/concept`,
    meta: `${API_URL}/metadata`,
    category: `${API_URL}/category`,
    status: `${API_URL}/status`,
    concept_search: `${API_URL}/concept/search`,
    meta_search: `${API_URL}/metadata/search`,
    concept_titles: `${API_URL}/concept/allTitles`,
};


const CancelToken = axios.CancelToken;
let searchCancelToken = CancelToken.source();

export const searchForConcepts = query => {
    searchCancelToken.cancel('Cancelled by new search');
    searchCancelToken = CancelToken.source();
    return axios.get(`${API_ENDPOINTS.concept_search}${query}`, {cancelToken: searchCancelToken.token})
};

export const getConceptById = id => axios.get(`${API_ENDPOINTS.concept}/${id}`);

export const getAllStatus = () => axios.get(`${API_ENDPOINTS.status}`);

export const updateConcept = concept => axios.put(`${API_ENDPOINTS.concept}`,concept);
export const createConcept = concept => axios.post(`${API_ENDPOINTS.concept}`,concept);

export const archiveConcept = id => axios.delete(`${API_ENDPOINTS.concept}/${id}`,);

export const getAllConceptTitles = () => axios.get(`${API_ENDPOINTS.concept_titles}`);
export const getAllMetas = () => axios.get(`${API_ENDPOINTS.meta}`);

export const getAllCategories= () => axios.get(`${API_ENDPOINTS.category}`);