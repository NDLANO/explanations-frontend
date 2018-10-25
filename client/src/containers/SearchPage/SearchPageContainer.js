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
import BEMHelper from "react-bem-helper";


class SearchContainer extends React.Component {
    render() {

        const {t, languages=[], subjects=[], searchResult,searchForConcept} = this.props;

        if (languages.length === 0 || subjects.length === 0) {
            return (
                <OneColumn>
                    <div>
                        <h4>Loading...</h4>
                    </div>
                </OneColumn>
            )
        }

        return (
            <OneColumn>
                <SearchForm t={t}
                            languages={languages}
                            subjects={subjects}
                            search={searchForConcept}/>
                <SearchResultList results={searchResult}/>
            </OneColumn>
        )
    }
}



const mapStateToProps = state => ({searchResult: state.search.results, languages: state.meta.languages, subjects: state.meta.subjects});

export default compose(
    connect(mapStateToProps, {searchForConcept}),
    injectT,
)(SearchContainer);
