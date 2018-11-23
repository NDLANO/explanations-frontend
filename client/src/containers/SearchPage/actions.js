import * as Api from "../../api";

export const SEARCH_FOR_CONCEPT = 'SEARCH_FOR_CONCEPT';
export const searchForConcept = (query) => {
    return dispatch => {
        Api.searchForConcepts(query)
            .then(data => dispatch({type: SEARCH_FOR_CONCEPT, payload: data.data}))
            .catch(err => err);
    };
};