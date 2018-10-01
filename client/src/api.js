/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import axios from 'axios';

const ROOT_URL = "http://http://18.194.35.165";

const API_URL = `${ROOT_URL}/api`;

const API_ENDPOINTS = {
    concept: `${API_URL}/concept`
};

export const getConcepts = query => {
    return axios.get(`${API_ENDPOINTS.concept}?${query}`);
};
