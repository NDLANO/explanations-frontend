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

import './style.css'
import {searchForConcept} from "./Actions";
import SearchResultList from "./components/SearchResultList";
import {sortObjectsByKey} from "../../utilities";
import Loading from "../../components/Loading/Component";

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
    let lang = state.meta.find(x => x.category.name === "Language");
    if (!lang)
        lang = [];
    else
        lang = lang.metaList;

    let sub = state.meta.find(x => x.category.name === "Subject");
    if (!sub)
        sub = [];
    else
        sub = sub.metaList;

    return  ({
        searchResult: state.search.results,
        meta: state.meta,
        languages: lang.sort(sortObjectsByKey('name')),
        subjects: sub.sort(sortObjectsByKey('name')),
        locale: state.locale
    })
};

export default compose(
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(SearchContainer);
