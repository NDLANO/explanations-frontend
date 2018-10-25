/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import axios from 'axios';

const ROOT_URL = process.env['NODE_ENV'] === 'development' ? 'http://localhost:63365' : 'http://ndla-api-1275813378.eu-west-1.elb.amazonaws.com';

const API_URL = `${ROOT_URL}/api`;

const API_ENDPOINTS = {
    concept: `${API_URL}/concept`,
    meta: `${API_URL}/metadata`,
    concept_search: `${API_URL}/concept/search`,
    meta_search: `${API_URL}/metadata/search`,
};

export const searchForConcepts = query => axios.get(`${API_ENDPOINTS.concept_search}${query}`);

export const getConceptById = id => axios.get(`${API_ENDPOINTS.concept}/${id}`);

export const getListOfMetaBy = meta => axios.get(`${API_ENDPOINTS.meta_search}?category=${meta}`);

export const updateConcept = concept => axios.put(`${API_ENDPOINTS.concept}`,concept);

export const createConcept = concept => axios.post(`${API_ENDPOINTS.concept}`,concept);