/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {sortObjectsByKey} from "../../utilities";
import {getFormValues} from "redux-form";
import ApiClient from "../../api";

const ALL_LANGUAGES = {
    id: -1,
    name: "Alle språk",
    description: " "
};

const ALL_SUBJECTS = {
    id: -1,
    name: "Alle fag",
    description: " "
};

const getMetaByCategory = (list, name, DEFAULT_OBJECT) => {
    let fromState = list.find(x => x.category.name === name);

    if (fromState && fromState.metaList) {
        let [...unpacked] = fromState.metaList;
        unpacked = unpacked
            .sort(sortObjectsByKey('name'));
        if (!unpacked.find(x => x.id === -1))
            unpacked.splice(0, 0, DEFAULT_OBJECT);
        return unpacked;
    }
    return [];
};


const getDefaultLanguage = (languages, locale) => {
    let lang = languages.find(x => x.abbreviation === locale);
    let defaultLanguage = null;
    if (lang) {
        defaultLanguage = lang.id;
    }
    return defaultLanguage;
}

const getAutoCompleteList = (state) => {
    let autoComplete = [];
    const conceptForm = getFormValues("conceptForm")(state);
    if (conceptForm) {
        const {title} = conceptForm;
        if(title)
            autoComplete = state.cacheFromServer.conceptTitles.filter(x => x.toLowerCase().includes(title.toLowerCase()));
    }
    return autoComplete;
};

export const mapStateToProps = state =>{
    const subjects = getMetaByCategory(state.cacheFromServer.meta, "Subject", ALL_SUBJECTS);
    const languages = getMetaByCategory(state.cacheFromServer.meta, "Language", ALL_LANGUAGES);
    const token = state.credentials.accessToken;
    return  ({
        searchResult: state.search.results,
        languages: languages.map(x => ({value: x.id, label: x.name})),
        subjects: subjects.map(x => ({value: x.id, label: x.name})),
        initialValues: {
            language: getDefaultLanguage(languages, state.locale)
        },
        autoComplete: getAutoCompleteList(state),
        apiClient: new ApiClient(token)
    })
};

