/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {getFormValues} from "redux-form";
import {sortObjectsByKey} from "../../utilities/sorting";
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

const metaToDropdownValue = ob => ({value: ob.id, label: ob.name});

const getMetaByCategory = (list, name, DEFAULT_OBJECT) => {
    let fromState = list.find(x => x.category.categoryType.name.toLowerCase() === name);

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


const getAutoCompleteList = (state) => {
    let autoComplete = [];
    const conceptForm = getFormValues(SEARCH_FORM_NAME)(state);
    if (conceptForm) {
        const {title} = conceptForm;
        if(title)
            autoComplete = state.search.autocompleteTitles
                .filter(x => x.toLowerCase().includes(title.toLowerCase()));
    }
    return autoComplete;
};

export const mapStateToProps = state =>{
    const {language, subject, term} = state.search;
    const subjects = getMetaByCategory(state.cacheFromServer.meta, "subject", ALL_SUBJECTS);
    const languages = getMetaByCategory(state.cacheFromServer.meta, "language", ALL_LANGUAGES);

    let fallBackLanguage = languages.find(x => x.abbreviation === state.locale);
    if (!fallBackLanguage)
        fallBackLanguage = ALL_LANGUAGES;

    const searchQuery = {
        title: term,
        language: metaToDropdownValue(language ? language : fallBackLanguage),
        subject: metaToDropdownValue(subject ? subject : ALL_SUBJECTS)};

    return  ({
        locale: state.locale,
        searchResultMeta: state.search.resultMeta,
        searchResult: state.search.results,
        languages: languages.map(x => ({value: x.id, label: x.name})),
        subjects: subjects.map(x => ({value: x.id, label: x.name})),
        autoComplete: getAutoCompleteList(state),
        searchQuery,
    })
};

