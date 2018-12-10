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

const classes = new BEMHelper({
    name: 'search-result-list',
    prefix: 'c-',
});

const SearchResultList = ({results})=>
    <div>
        <ul {...classes()}>
            {results.map(result => <SearchResultItem key={result.id} item={result} classes={classes}/>)}
        </ul>
    </div>;

SearchResultList.propTypes = {
    results: PropTypes.array
};

SearchResultList.defaultProps = {
    results: []
};

export default SearchResultList;