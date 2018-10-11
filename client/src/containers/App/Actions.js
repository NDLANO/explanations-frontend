import * as Api from "../../api";

export const UPDATE_SUBJECTS = 'UPDATE_SUBJECTS';
export const UPDATE_LANGUAGES = 'UPDATE_LANGAUGES';


export const loadSubjectMeta = () => {
    return dispatch => {
        const request = Api.getListOfMetaBy("subjects")
            .then(data => dispatch({type: UPDATE_SUBJECTS, payload: data.data}));
    }
};

export const loadLanguageMeta = () => {
    return dispatch => {
        const request = Api.getListOfMetaBy("languages")
            .then(data => dispatch({type: UPDATE_LANGUAGES, payload: data.data}));
    };
};
