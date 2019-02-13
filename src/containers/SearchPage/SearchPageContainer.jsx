/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {OneColumn, Breadcrumb} from '@ndla/ui';
import {injectT} from "@ndla/i18n";
import {compose} from "redux";
import {Helmet} from "react-helmet";

import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";

import SearchForm from "./components/SearchForm";
import {updateInitialFormValues, updateSearchResult} from "./searchPageActions";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";
import {indexRoute, searchRoute} from "../../utilities/routeHelper";


class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userHasSearched: false};
        this.search = this.search.bind(this);
    }

    search(query) {
        const {updateSearchResult, apiService} = this.props;
        apiService.searchForConcepts(query)
            .then(updateSearchResult)
            .then(() => this.setState({userHasSearched: true}));
    }

    componentWillUnmount() {
        this.props.updateInitialFormValues({term: '', language: null, subject: null});
    }

    render() {
        const {t,
            languages,
            subjects,
            searchResult,
            autoComplete,
            initialFormValues
        } = this.props;

        const resultHeader = this.state.userHasSearched ? `${searchResult.length} ${t('searchPage.resultHits')}` : '';
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: searchRoute(), name: t('search.title')},
        ];

        return (
            <OneColumn>
                <Breadcrumb items={breadCrumbs}/>
                <Helmet title={t('pageTitles.searchForConcept')} />
                <SearchForm t={t}
                            initialValues={initialFormValues}
                            languages={languages}
                            subjects={subjects}
                            search={this.search}
                            autoComplete={autoComplete}/>
                <SearchResultList results={searchResult} resultHeader={resultHeader} t={t}/>
            </OneColumn>
        )
    }
}

SearchContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    updateSearchResult: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,

    // Optional
    searchResult: PropTypes.array,
    autoComplete: PropTypes.array,
    initialFormValues: PropTypes.object
};


const languagesExists = ({languages}) =>  languages.length > 0;
const subjectsExists = ({subjects}) => subjects.length > 0;
const languageAndSubjectsShouldBePresent = compose(
    WithEither(languagesExists, () => <Loading message='loadingMessage.loadingLanguages' />),
    WithEither(subjectsExists, () => <Loading message='loadingMessage.loadingSubjects' />),
)(SearchContainer);

export default compose(
    connect(mapStateToProps, {updateSearchResult, updateInitialFormValues}),
    withApiService,
    injectT,
)(languageAndSubjectsShouldBePresent);

