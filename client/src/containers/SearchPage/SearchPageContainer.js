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

const SearchContainer = ({t, languages, subjects, searchResult,searchForConcept,locale}) =>
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
                        search={searchForConcept}/>
            <SearchResultList results={searchResult}/>
        </OneColumn>
    )
}



const mapStateToProps = state =>{
    let languages = state.meta.find(x => x.category.name === "Language");
    if (!languages)
        languages = [];
    else{
        languages = languages
            .metaList
            .sort(sortObjectsByKey('name'));

        if (!languages.find(x => x.id === -1))
            languages.splice(0, 0, ALL_LANGUAGES);
    }

    let subjects = state.meta.find(x => x.category.name === "Subject");
    if (!subjects)
        subjects = [];
    else{

        subjects = subjects
            .metaList
            .sort(sortObjectsByKey('name'));
        if (!subjects.find(x => x.id === -1))
            subjects.splice(0, 0, ALL_SUBJECTS);
    }

    return  ({
        searchResult: state.search.results,
        meta: state.meta,
        languages,
        subjects,
        locale: state.locale
    })
};

export default compose(
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(SearchContainer);
