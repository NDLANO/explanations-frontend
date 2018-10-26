import SearchResultItem from "./SearchResultItem";
import React from "react";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';


const classes = new BEMHelper({
    name: 'search-result-list',
    prefix: 'c-',
});

const SearchResultList = ({results=[]})=>
    <div>
        <ul {...classes()}>
            {results
                .sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
                .map(result => <SearchResultItem key={result.id} item={result}/>)
            }
        </ul>
    </div>;

SearchResultList.propTypes = {
    results: PropTypes.array
};

export default SearchResultList;