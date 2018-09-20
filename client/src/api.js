import axios from 'axios';

const ROOT_URL = "http://18.197.149.64";

const API_URL = `${ROOT_URL}/api`;

const API_ENDPOINTS = {
    concept: `${API_URL}/concept`
};

export const getConcepts = query => {
    return axios.get(`${API_ENDPOINTS.concept}?${query}`);
};
