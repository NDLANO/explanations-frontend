/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react'
import PropTypes, {func, number, oneOfType, string} from 'prop-types';
import _ from 'lodash';
import {connect} from "react-redux";
import {change, Field, reduxForm} from 'redux-form';
import {PageContainer, Content, Breadcrumb, OneColumn} from "@ndla/ui";
import {injectT} from "@ndla/i18n";
import {compose} from "redux";
import {withRouter} from "react-router";
import BEMHelper from "react-bem-helper";

import MetaFilter from "../../components/MetaFilter";
import ListView from "../../components/ListView";

import ListHeader from "./components/ListHeader";
import Loading from '../../components/Loading';
import WithEither from "../../components/HOC/WithEither";
import withApiService from "../../components/HOC/withApiService";

import {updateSearchQuery, updateSearchResult} from "./searchPageActions";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";

import {categoryProps, historyShape, matchShape, metaProps} from "../../utilities/commonShapes";
import {loginSuccess} from "../Login";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loadCategories, loadMeta} from "../App/actions";


import 'url-search-params-polyfill';
import {SEARCH_FORM_NAME} from "./components/SearchForm";
import {indexRoute} from "../../utilities/routeHelper";
import {Helmet} from "react-helmet";
import Input from "../../components/Input";

const classes = new BEMHelper({
    name: 'search-page',
    prefix: 'c-',
});

class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            numberOfPages: 0,
            totalItems: 0,
            values: [],
            items: [],
            isSearching: true,
            metaIdMap: _.chain(props.meta).keyBy('languageVariation').mapValues('id').value(),
            showFilter: window.innerWidth - 300 > 768,
            searchLanguage: props.locale
        };

        this.onToggleFilter = this.onToggleFilter.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.loadFilterData = this.loadFilterData.bind(this);
        this.onRemoveTag = this.onRemoveTag.bind(this);
        this.search = _.debounce(this.searchConcepts.bind(this), 300, {
            'leading': true,
        });
    }

    componentDidMount() {
        const {history, change} = this.props;
        const searchParam = new URLSearchParams(history.location.search);

        if (searchParam.get('term'))
            change(SEARCH_FORM_NAME, "title", searchParam.get('term'));
        this.loadFilterData(this.state.searchLanguage);
    }

    loadFilterData(locale) {
        const {apiService, loadMeta, loadCategories} = this.props;

        const searchParams = new URLSearchParams();
        searchParams.append('language', locale);
        searchParams.append('pageSize', '100');
        searchParams.append('page', '1');

        const param = searchParams.toString();

        apiService.get(apiService.endpoints.meta, param).then(data => loadMeta(data.results));
        apiService.get(apiService.endpoints.category, param).then(data => loadCategories(data.results));

        this.searchConcepts(this.state);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.meta[0] && this.props.meta[0] && prevProps.meta[0].language.id !== this.props.meta[0].language.id) {
            this.setState({metaIdMap: _.chain(this.props.meta).keyBy('languageVariation').mapValues('id').value()})
        }
    }


    searchConcepts(data) {
        const query = new URLSearchParams();
        query.append("language", this.state.searchLanguage);

        if (data)
            query.append("page", data.page);
        else
            query.append("page", this.state.page + 1);

        this.state.values.forEach(meta => query.append("meta", this.state.metaIdMap[meta]));

        this.props.apiService.searchForConcepts(query.toString())
            .then(({results, page, numberOfPages, totalItems}) => this.mapResultsToListView(results).then(items => this.setState({items, page, numberOfPages, totalItems, isSearching: false})));

    }

    mapResultsToListView(list) {
        return Promise.all(list.map(concept => new Promise((resolve, reject) => {

            const {media} = concept;

            if (!media || media.length === 0)
                resolve(concept);

            const image = media.find(x => x.mediaType.typeGroup.name.toLowerCase() === "image");
            if (!image)
                resolve(concept);


            resolve({
                ...concept,
                previewImage: 'https://api.ndla.no/image-api/raw/id/'+image.externalId
            });
            // TODO IMAGEBUG fix
            /*
            const api = new ImageApiService();
            api.getById(image.externalId,)
                .then(x => resolve({
                    ...concept,
                    previewImage: x.imageUrl,
                    previewAltText: x.alttext.alttext,
                }))
                .catch(x => resolve(concept));
                */
        })));
    }

    onChange(values, value) {
        this.setState({values, page: 0}, this.search);
    }

    onRemoveTag(languageVariation) {
        this.setState(prev => ({values: prev.values.filter(x => x !== languageVariation)}), this.search)
    }

    onToggleFilter() {
        this.setState(prev => ({showFilter: !prev.showFilter}));
    }

    onLanguageChange(abbreviation) {
        this.setState({searchLanguage: abbreviation}, this.loadFilterData.bind(null, abbreviation));
    }

    render(){
        const {values, items, page, numberOfPages, totalItems, isSearching, showFilter} = this.state;
        const {categories, meta, t, locale} = this.props;

        const languages = meta.filter(x => x.category.typeGroup.name.toLowerCase() === "language").map(x => ({...x, title: x.name, value: x.languageVariation}));
        const options   = meta.filter(x => x.category.typeGroup.name.toLowerCase() !== "language").map(x => ({...x, title: x.abbreviation || x.name, value: x.languageVariation}));

        return (
            <PageContainer backgroundWide >

                <Helmet title={t('searchPage.title')} />
                <Content>
                    {Boolean(languages.length) && <MetaFilter values={values}
                                                              t={t}
                                                              onChange={this.onChange}
                                                              categories={categories.filter(x => x.typeGroup.name.toLowerCase() !== "language") || []}
                                                              options={options}
                                                              onChangeLanguage={this.onLanguageChange}
                                                              languageOptions={languages}
                                                              languageDefault={languages.find(x => x.abbreviation === locale)}
                                                              isOpen={showFilter}/>}

                    <div {...classes('content')}>
                        <ListHeader resultCount={totalItems}
                                    isSearching={isSearching}
                                    values={values}
                                    options={options}
                                    sidebarOpen={!showFilter}
                                    onRemoveTag={this.onRemoveTag}
                                    onFilterClick={this.onToggleFilter}
                                    t={t}/>
                        <OneColumn>
                            <Field component={Input} t={t} name="test" placeholder="test" />
                        </OneColumn>
                        <ListView items={items}
                                  page={page}
                                  lastPage={numberOfPages}
                                  onPagerClick={this.searchConcepts} />
                    </div>
                </Content>
            </PageContainer>
        );
    }
}


SearchContainer.defaultProps = {
    categories: [],
    meta: []
};


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
    loadMeta: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,

    // Optional
    searchResult: PropTypes.array,
    searchResultMeta: PropTypes.object,
    autoComplete: PropTypes.array,
    searchQuery: PropTypes.object,
    categories: PropTypes.arrayOf(categoryProps),
    meta: PropTypes.arrayOf(metaProps),
    match: PropTypes.shape(matchShape)
};


const languagesExists = ({languages}) =>  languages.length > 0;
const subjectsExists = ({subjects}) => subjects.length > 0;
const languageAndSubjectsShouldBePresent = compose(
    WithEither(languagesExists, () => <Loading message='loadingMessage.loadingLanguages' />),
    WithEither(subjectsExists, () => <Loading message='loadingMessage.loadingSubjects' />),
)(SearchContainer);

export default compose(
    withRouter,
    withAuthenticationService,
    connect(mapStateToProps, {loadMeta, loadCategories, updateSearchResult, updateSearchQuery, change, loginSuccess}),
    withApiService,
    injectT,
    reduxForm({form: "searchForm"})
)(languageAndSubjectsShouldBePresent);

