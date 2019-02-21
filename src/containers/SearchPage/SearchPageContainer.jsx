/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from "react-redux";
import {OneColumn, Breadcrumb} from '@ndla/ui';
import {injectT} from "@ndla/i18n";
import {compose} from "redux";
import {Helmet} from "react-helmet";
import Pager from "@ndla/pager";

import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";

import SearchForm from "./components/SearchForm";
import {updateSearchQuery, updateSearchResult} from "./searchPageActions";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";
import {indexRoute, searchRoute} from "../../utilities/routeHelper";


import 'url-search-params-polyfill';

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHasSearched: false,
            page: 1,
            pageSize: 10,
            lastPage: 1,
            query: ''
        };
        this.search = this.search.bind(this);

        this.search = _.debounce(this.search, 300);
    }

    createSearchQueryFromValues(values) {
        const {term, ...metas} = values;

        const searchParams = new URLSearchParams();

        if (term)
            searchParams.append('title', term);

        Object.values(_.pickBy(metas, _.identity))
            .forEach(x => searchParams.append('meta', x.id));

        return searchParams;
    }

    search(values) {
        const query = this.createSearchQueryFromValues(values);
        if (!query.toString())
            return;

        this.props.updateSearchQuery(values);
        query.append('language', this.props.locale);
        query.append('page', this.state.page);
        query.append('pageSize', this.state.pageSize);
        this.setState({query: query.toString()});

        this.searchForConcepts();
    }

    searchForConcepts(){
        const {updateSearchResult, apiService} = this.props;
        apiService.searchForConcepts(this.state.query)
            .then(updateSearchResult)
            .then(() => this.setState({userHasSearched: true}));
    }

    clickPager() {
        this.setState(prev => {
            if (prev.page < prev.lastPage)
                return {page: prev.page + 1};
            return {};
        },
            this.searchForConcepts
        );

    }

    componentWillUnmount() {
        this.props.updateSearchQuery({term: '', language: null, subject: null});
    }

    render() {
        const {t,
            languages,
            subjects,
            searchResult,
            autoComplete,
            searchQuery,
        } = this.props;

        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: searchRoute(), name: t('search.title')},
        ];

        return (
            <OneColumn>
                <Breadcrumb items={breadCrumbs}/>
                <Helmet title={t('pageTitles.searchForConcept')} />
                <SearchForm t={t}
                            initialValues={searchQuery}
                            languages={languages}
                            subjects={subjects}
                            search={this.search}
                            autoComplete={autoComplete}/>
                <SearchResultList results={searchResult} searchQuery={searchQuery} userHasSearched={this.state.userHasSearched} t={t}/>
                {Boolean(searchResult.length) && <Pager lastPage={this.state.lastPage} page={this.state.page} onClick={this.clickPager}  />}
            </OneColumn>
        )
    }
}

SearchContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    subjects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    updateSearchResult: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    updateSearchQuery: PropTypes.func.isRequired,

    // Optional
    searchResult: PropTypes.array,
    autoComplete: PropTypes.array,
    searchQuery: PropTypes.object
};


const languagesExists = ({languages}) =>  languages.length > 0;
const subjectsExists = ({subjects}) => subjects.length > 0;
const languageAndSubjectsShouldBePresent = compose(
    WithEither(languagesExists, () => <Loading message='loadingMessage.loadingLanguages' />),
    WithEither(subjectsExists, () => <Loading message='loadingMessage.loadingSubjects' />),
)(SearchContainer);

export default compose(
    connect(mapStateToProps, {updateSearchResult, updateSearchQuery: updateSearchQuery}),
    withApiService,
    injectT,
)(languageAndSubjectsShouldBePresent);

