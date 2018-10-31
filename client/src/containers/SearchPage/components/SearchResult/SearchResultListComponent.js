import SearchResultItem from "./SearchResultItemComponent";
import React from "react";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';

import './style.css';

const classes = new BEMHelper({
    name: 'search-result-list',
    prefix: 'c-',
});

const SearchResultList = ({results=[]})=>
    <div>
        <ul {...classes()}>
            {results
                .map(result => <SearchResultItem key={result.id} item={result}/>)
            }
        </ul>
    </div>;

SearchResultList.propTypes = {
    results: PropTypes.array
};

export default SearchResultList;