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
import {updateSearchResult} from "./Actions";
import SearchResultItem from "./components/SearchResultItem";

/*
const SearchResultList = () =>
    <div>
        <SearchList
            query={searchObject.query}
            locale={searchObject.language || locale}
            results={results.results}
            searching={searching}
            type={type}
        />
        <Pager
            page={searchObject.page ? parseInt(searchObject.page, 10) : 1}
            lastPage={lastPage}
            query={searchObject}
            pathname={toSearch(undefined, type)}
        />
    </div>*/


class SearchContainer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <OneColumn>
                <SearchForm t={this.props.t} search={this.props.updateSearchResult}/>
                <ul>{this.props.searchResult.map(result => <SearchResultItem key={result.id} item={result}/>)}</ul>
            </OneColumn>
        );
    }
}

const mapStateToProps = state => ({searchResult: state.searchResult});

export default compose(
    connect(mapStateToProps, {updateSearchResult}),
    injectT,
)(SearchContainer);
