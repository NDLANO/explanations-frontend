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
import {change} from 'redux-form';
import {OneColumn, Breadcrumb} from '@ndla/ui';
import {injectT} from "@ndla/i18n";
import {compose} from "redux";
import {Helmet} from "react-helmet";
import Pager from "@ndla/pager";
import {withRouter} from "react-router";

import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";

import SearchForm, {SEARCH_FORM_NAME} from "./components/SearchForm";
import {updateSearchQuery, updateSearchResult} from "./searchPageActions";
import SearchResultList from "./components/SearchResult";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";
import {createRoute, indexRoute, searchRoute} from "../../utilities/routeHelper";


import 'url-search-params-polyfill';
import {historyShape, matchShape} from "../../utilities/commonShapes";

const PageItemComponent = ({children, ...rest}) => <span {...rest}>{children}</span>;

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userHasSearched: false,
            page: 1,
            pageSize: 10,
            query: {}
        };
        this.search = this.search.bind(this);
        this.clickPager = this.clickPager.bind(this);
        this.search = _.debounce(this.search, 300);
    }

    componentDidMount() {
        const {history, change} = this.props;
        const searchParam = new URLSearchParams(history.location.search);

        if (searchParam.get('term'))
            change(SEARCH_FORM_NAME, "title", searchParam.get('term'));
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
        this.setState({query});

        this.searchForConcepts();
    }

    searchForConcepts(){
        const {updateSearchResult, apiService} = this.props;

        const query = new URLSearchParams();
        [...this.state.query.keys()].map(x => query.append(`${x}`, this.state.query.get(x)));
        query.append('language', this.props.locale);
        query.append('page', this.state.page);
        query.append('pageSize', this.state.pageSize);

        apiService.searchForConcepts(query.toString())
            .then(updateSearchResult)
            .then(() => this.setState({userHasSearched: true}));
    }

    clickPager({page}) {
        this.setState(({page}),
            this.searchForConcepts
        );
    }

    componentWillUnmount() {
        this.props.updateSearchQuery({term: '', language: null, subject: null});
    }

    getInitialFormValues() {
        const {searchQuery, locale, languages} = this.props;
        const initialValues = {
            term: searchQuery.term,
        };

        if (searchQuery.language && searchQuery.language.value !== -1)
            initialValues['language'] = this.mapItemToDropdownValue(searchQuery.language);
        else{
            const l = languages.find(x => x.abbreviation === locale);
            initialValues['language'] = this.mapItemToDropdownValue(l ? l : this.defaultDropdown('phrases.allLanguages'));
        }

        initialValues['subject'] = this.mapItemToDropdownValue(searchQuery.subject ? searchQuery.subject : this.defaultDropdown('phrases.allSubjects'));

        return initialValues;
    }

    getSearchResultQuery() {
        const {searchQuery} = this.props;

        const resultQuery = {term: searchQuery.term};
        resultQuery['language'] = this.mapItemToDropdownValue(!searchQuery.language ? this.defaultDropdown('phrases.allLanguages') : searchQuery.language);
        resultQuery['subject'] = this.mapItemToDropdownValue(!searchQuery.subject ? this.defaultDropdown('phrases.allSubjects') : searchQuery.subject);

        return resultQuery;
    }

    mapItemToDropdownValue(item) {
        return {value: item.id, label: item.name};
    }

    defaultDropdown(text) {
        const {t} = this.props;

        return {id: -1, name: t(text)};
    }

    render() {
        const {t,
            match,
            languages,
            subjects,
            searchResult,
            autoComplete,
            searchResultMeta,
            searchResultMeta: {page, numberOfPages},
        } = this.props;

        const breadCrumbs = [
            {to: createRoute(match,indexRoute()), name: t('indexPage.title')},
            {to: createRoute(match,searchRoute()), name: t('search.title')},
        ];

        return (
            <OneColumn>
                <Breadcrumb items={breadCrumbs}/>
                <Helmet title={t('pageTitles.searchForConcept')} />
                <SearchForm t={t}
                            initialValues={this.getInitialFormValues()}
                            languages={[this.defaultDropdown('phrases.allLanguages'), ...languages].map(this.mapItemToDropdownValue)}
                            subjects={[this.defaultDropdown('phrases.allSubjects'), ...subjects].map(this.mapItemToDropdownValue)}
                            search={this.search}
                            autoComplete={autoComplete}/>
                <SearchResultList match={match} searchResultMeta={searchResultMeta} results={searchResult} searchQuery={this.getSearchResultQuery()} userHasSearched={this.state.userHasSearched} t={t}/>
                {Boolean(numberOfPages > 1) && <Pager pageItemComponentClass={PageItemComponent} lastPage={numberOfPages} page={page} onClick={this.clickPager}  />}
            </OneColumn>
        )
    }
}

SearchContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    history: PropTypes.shape(historyShape).isRequired,
    subjects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    updateSearchResult: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    match: PropTypes.shape(matchShape).isRequired,

    // Optional
    searchResult: PropTypes.array,
    searchResultMeta: PropTypes.object,
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
    withRouter,
    connect(mapStateToProps, {updateSearchResult, updateSearchQuery, change}),
    withApiService,
    injectT,
)(languageAndSubjectsShouldBePresent);

