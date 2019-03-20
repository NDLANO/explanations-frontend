/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';

import SearchResultItem from "../Item/SearchResultItemComponent";
import SearchResultHeader from '../Header';

const classes = new BEMHelper({
    name: 'search-result-list',
    prefix: 'c-',
});

const SearchResultList = ({results, userHasSearched, t, searchQuery, searchResultMeta})=>
    <div>
        <SearchResultHeader searchResultMeta={searchResultMeta} searchQuery={searchQuery} userHasSearched={userHasSearched} t={t} results={results} />

        {Boolean(results.length) &&
            <ul {...classes()}>
                {results.map(result => <SearchResultItem key={result.id} {...result} t={t}/>)}
            </ul>
        }
    </div>;

SearchResultList.propTypes = {
    // Required
    searchQuery: PropTypes.object.isRequired,
    // Optional
    results: PropTypes.array,
    userHasSearched: PropTypes.bool,
    searchResultMeta: PropTypes.object,
};

SearchResultList.defaultProps = {
    results: [],
    userHasSearched: false
};

export default SearchResultList;