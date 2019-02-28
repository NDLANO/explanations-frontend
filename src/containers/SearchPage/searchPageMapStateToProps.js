/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {getFormValues} from "redux-form";
import {SEARCH_FORM_NAME} from "./components/SearchForm";


const getMetaByCategory = (list, name) => {
    let fromState = list.find(x => x.category.typeGroup.name.toLowerCase() === name);

    if (fromState && fromState.metaList) {
        return fromState.metaList;
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
    const subjects = getMetaByCategory(state.cacheFromServer.meta, "subject");
    const languages = getMetaByCategory(state.cacheFromServer.meta, "language");


    return  ({
        locale: state.locale,
        searchResultMeta: state.search.resultMeta,
        searchResult: state.search.results,
        languages: languages,
        subjects: subjects,
        autoComplete: getAutoCompleteList(state),
        searchQuery: {
            language,
            subject,
            term
        }
    })
};

