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
import {compose} from "redux";

import Loading from "../../components/Loading";
import WithEither from "../../components/HOC/WithEither";

import {updateSearchResult} from "./actions";
import SearchForm from "./components/SearchForm";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./mapStateToProps";


const SearchContainer = ({t, languages, subjects, searchResult,updateSearchResult,locale, autoComplete, initialValues, apiClient}) =>
    <OneColumn>
        <SearchForm t={t}
                    languages={languages}
                    subjects={subjects}
                    search={query => apiClient.searchForConcepts(query).then(updateSearchResult)}
                    autoComplete={autoComplete}
                    initialValues={initialValues}/>
        <SearchResultList results={searchResult}/>
    </OneColumn>;

const showLoading = () => <Loading/>;
const languagesExists = ({languages}) =>  languages.length > 0;
const subjectsExists = ({subjects}) => subjects.length > 0;
const languageAndSubjectsShouldBePresent = compose(
    WithEither(languagesExists, showLoading),
    WithEither(subjectsExists, showLoading)
)(SearchContainer);

export default compose(
    connect(mapStateToProps, {updateSearchResult}),
    injectT,
)(languageAndSubjectsShouldBePresent);

