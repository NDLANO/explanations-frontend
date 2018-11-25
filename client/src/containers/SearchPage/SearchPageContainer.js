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

import {searchForConcept} from "./actions";
import SearchForm from "./components/SearchForm";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./mapStateToProps";


const SearchContainer = ({t, languages, subjects, searchResult,searchForConcept,locale, autoComplete, initialValues}) =>
    <OneColumn>
        <SearchForm t={t}
                    languages={languages}
                    subjects={subjects}
                    search={searchForConcept}
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
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(languageAndSubjectsShouldBePresent);

