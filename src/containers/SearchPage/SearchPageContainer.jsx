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
import {PageContainer, Content, OneColumn, Breadcrumb} from "@ndla/ui";
import Button from "@ndla/button";
import {injectT} from "@ndla/i18n";
import {compose} from "redux";
import {withRouter} from "react-router";
import BEMHelper from "react-bem-helper";
import {Helmet} from "react-helmet";
import {Filter} from '@ndla/icons/editor';
import {Cross} from "@ndla/icons/action";
import {Search} from "@ndla/icons/common";
import MetaFilter from "../../components/MetaFilter";
import ListView from "../../components/ListView";

import ListHeader from "./components/ListHeader";
import withApiService from "../../components/HOC/withApiService";

import {updateSearchResult} from "./searchPageActions";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";

import {categoryProps, historyProps, matchProps, metaProps} from "../../utilities/commonProps";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loadCategories, loadMeta} from "../App/actions";


import 'url-search-params-polyfill';
import {indexRoute} from "../../utilities/routeHelper";
import AutoComplete from "../../components/AutoComplete/AutoCompleteComponent";
import ImageApi from "../../services/imageApiService";
import {loginSuccess} from "../Login";

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
            searchLanguage: props.locale,
            term: ''
        };
        this.onPageClick = this.onPageClick.bind(this);
        this.onTermChange = this.onTermChange.bind(this);
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
        const {history} = this.props;
        const searchParam = new URLSearchParams(history.location.search);

        if (searchParam.get('term'))
            this.setState({term: searchParam.get('term')});
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


    searchConcepts() {
        const query = new URLSearchParams();
        query.append("language", this.state.searchLanguage);
        query.append("page", this.state.page);
        if (this.state.term)
            query.append("title", this.state.term);
        this.state.values.forEach(meta => query.append("meta", this.state.metaIdMap[meta]));

        this.setState({isSearching: true});
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

            this.props.imageApi.getById(image.externalId,)
                .then(x => resolve({
                    ...concept,
                    previewImage: x.imageUrl,
                    previewAltText: x.alttext.alttext,
                }))
                .catch(x => resolve(concept));

        })));
    }

    onPageClick({page}) {
        this.setState({page}, this.search)
    }

    onChange(values, value) {
        this.setState({values, page: 1}, this.search);
    }

    onTermChange(newTerm) {
        this.setState({term: newTerm, page: 1}, this.search);
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
        const {values, items, page, numberOfPages, totalItems, isSearching, showFilter, term} = this.state;
        const {categories, meta, t, locale, match, searchResult} = this.props;
        const languages = meta.filter(x => x.category.typeGroup.name.toLowerCase() === "language").map(x => ({...x, title: x.name, value: x.languageVariation}));
        const options   = meta.filter(x => x.category.typeGroup.name.toLowerCase() !== "language").map(x => ({...x, title: x.abbreviation || x.name, value: x.languageVariation}));
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: indexRoute(), name: t('searchPage.title')},
        ];

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

                        <div {...classes('menu-toggle')}>
                            {showFilter ?  <Cross onClick={this.onToggleFilter} /> : <Filter onClick={this.onToggleFilter} />}
                        </div>
                        <OneColumn>

                            <Breadcrumb items={breadCrumbs}/>
                            <div {...classes('search-field')}>
                                <AutoComplete onChange={this.onTermChange}
                                              value={term}
                                              onSelect={this.onTermChange}
                                              items={searchResult.reduce(x => x.title, [])}
                                              placeholder={t("searchPage.title")}
                                />
                                <Button {...classes('submit-button')}>
                                    <Search />
                                </Button>
                            </div>
                            <ListHeader resultCount={totalItems}
                                        isSearching={isSearching}
                                        values={values}
                                        options={options}
                                        sidebarOpen={!showFilter}
                                        onRemoveTag={this.onRemoveTag}
                                        t={t}/>
                        </OneColumn>
                        <ListView items={items}
                                  page={page}
                                  lastPage={numberOfPages}
                                  match={match}
                                  onPagerClick={this.onPageClick} />
                    </div>
                </Content>
            </PageContainer>
        );
    }
}


SearchContainer.defaultProps = {
    categories: [],
    meta: [],
    searchResult: []
};


SearchContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    history: PropTypes.shape(historyProps).isRequired,
    subjects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    updateSearchResult: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService).isRequired,
    loadMeta: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    imageApi :PropTypes.instanceOf(ImageApi).isRequired,
    match: PropTypes.shape(matchProps).isRequired,

    // Optional
    searchResult: PropTypes.array,
    searchResultMeta: PropTypes.object,
    categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)),
    meta: PropTypes.arrayOf(PropTypes.shape(metaProps)),
};

export default compose(
    withRouter,
    withAuthenticationService,
    connect(mapStateToProps, {loadMeta, loadCategories, updateSearchResult, loginSuccess}),
    withApiService,
    injectT,
)(SearchContainer);

