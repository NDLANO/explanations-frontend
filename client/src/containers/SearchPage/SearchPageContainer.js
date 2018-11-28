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

import Loading from '../Loading';
import WithEither from "../../components/HOC/WithEither";

import {updateSearchResult} from "./searchPageActions";
import SearchForm from "./components/SearchForm";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./searchPageMapStateToProps";


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


const languagesExists = ({languages}) =>  languages.length > 0;
const subjectsExists = ({subjects}) => subjects.length > 0;
const languageAndSubjectsShouldBePresent = compose(
    WithEither(languagesExists, () => <Loading message='loadingMessage.loadingLanguages' />),
    WithEither(subjectsExists, () => <Loading message='loadingMessage.loadingSubjects' />),
)(SearchContainer);

export default compose(
    connect(mapStateToProps, {updateSearchResult}),
    injectT,
)(languageAndSubjectsShouldBePresent);

