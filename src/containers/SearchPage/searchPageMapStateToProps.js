/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {getFormValues} from "redux-form";
import {sortObjectsByKey} from "../../utilities";
import {SEARCH_FORM_NAME} from "./components/SearchForm";

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
        defaultLanguage = {value: lang.id, label: lang.name};
    }
    return defaultLanguage;
};

const getAutoCompleteList = (state) => {
    let autoComplete = [];
    const conceptForm = getFormValues(SEARCH_FORM_NAME)(state);
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
    return  ({
        searchResult: state.search.results,
        languages: languages.map(x => ({value: x.id, label: x.name})),
        subjects: subjects.map(x => ({value: x.id, label: x.name})),
        initialValues: {
            language: getDefaultLanguage(languages, state.locale),
            subject: {value: ALL_SUBJECTS.id, label: ALL_SUBJECTS.name}
        },
        autoComplete: getAutoCompleteList(state)
    })
};

