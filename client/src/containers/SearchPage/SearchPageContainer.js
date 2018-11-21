/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react'
import {connect} from "react-redux";
import {OneColumn} from "ndla-ui";
import {injectT} from "ndla-i18n";
import SearchForm from "./components/SearchForm";
import {compose} from "redux";

import {searchForConcept} from "./actions";
import SearchResultList from "./components/SearchResult";
import {sortObjectsByKey} from "../../utilities";
import Loading from "../../components/Loading";
import {getFormValues} from "redux-form";

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

const SearchContainer = ({t, languages, subjects, searchResult,searchForConcept,locale, conceptTitles, formValues, initialValues}) =>
{

    if (languages.length === 0 || subjects.length === 0) {
        return <Loading/>
    }

    return (
        <OneColumn>
            <SearchForm t={t}
                        locale={locale}
                        languages={languages}
                        subjects={subjects}
                        search={searchForConcept}
                        conceptTitles={conceptTitles}
                        formValues={formValues}
                        initialValues={initialValues}/>
            <SearchResultList results={searchResult}/>
        </OneColumn>
    )
}


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


const mapStateToProps = state =>{
    const subjects = getMetaByCategory(state.cacheFromServer.meta, "Subject", ALL_SUBJECTS);

    const languages = getMetaByCategory(state.cacheFromServer.meta, "Language", ALL_LANGUAGES);
    let lang = languages.find(x => x.abbreviation === state.locale);
    let defaultLanguage = null;
    if (lang) {
        defaultLanguage = lang.id;
    }

    return  ({
        formValues: getFormValues("conceptForm")(state),
        searchResult: state.search.results,
        meta: state.cacheFromServer.meta,
        languages: languages.map(x => ({value: x.id, label: x.name})),
        subjects: subjects.map(x => ({value: x.id, label: x.name})),
        locale: state.locale,
        initialValues: {
            language: defaultLanguage
        },
        conceptTitles: state.cacheFromServer.conceptTitles
    })
};

export default compose(
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(SearchContainer);
