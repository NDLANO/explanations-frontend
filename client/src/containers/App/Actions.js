import * as Api from "../../api";

export const UPDATE_SUBJECTS = 'UPDATE_SUBJECTS';
export const UPDATE_LANGUAGES = 'UPDATE_LANGAUGES';
export const UPDATE_LICENCES = 'UPDATE_LICENCES';


export const loadSubjectMeta = () => {
    return dispatch => {
        const request = Api.getListOfMetaBy("subject")
            .then(data => dispatch({type: UPDATE_SUBJECTS, payload: data.data}));
    }
};

export const loadLanguageMeta = () => {
    return dispatch => {
        const request = Api.getListOfMetaBy("language")
            .then(data => dispatch({type: UPDATE_LANGUAGES, payload: data.data}));
    };
};

export const loadLicenceMeta = () => {
    return dispatch => {
        const request = Api.getListOfMetaBy("licence")
            .then(data => dispatch({type: UPDATE_LICENCES, payload: data.data}));
    };
};

