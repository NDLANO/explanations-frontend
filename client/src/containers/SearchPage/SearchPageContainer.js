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


const SearchContainer = ({searchResult, searchForConcept, changePagination, t}) =>
    <OneColumn>
        <SearchForm t={t}
                    search={searchForConcept}/>
        <SearchResultList results={searchResult}
                          onPaginationChange={changePagination}/>
    </OneColumn>;

const mapStateToProps = state => ({searchResult: state.search.results});

export default compose(
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(SearchContainer);
