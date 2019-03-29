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

import {updateIsSearching, updateSearchQuery, updateSearchResult} from "./searchPageActions";
import {mapStateToProps} from "./searchPageMapStateToProps";
import ApiService from "../../services/apiService";

import {categoryProps, conceptProps, historyProps, matchProps, metaProps} from "../../utilities/commonProps";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import {loadCategories, loadMeta} from "../App/actions";


import 'url-search-params-polyfill';
import {indexRoute, searchRoute} from "../../utilities/routeHelper";
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
            metaIdMap: _.chain(props.meta).keyBy('languageVariation').mapValues('id').value(),
            showFilter: window.innerWidth - 300 > 768,
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
        this.loadFilterData();

        if (searchParam.get('term')){
            this.props.updateSearchQuery({title: searchParam.get('term'), page: 1});
            searchParam.delete('term');
            history.push({
                pathname: history.location.pathname,
                search: "?" + searchParam.toString()
            })
        }else {
            this.search();
        }
    }

    loadFilterData() {
        const {apiService, loadMeta, loadCategories, searchQuery: {language}} = this.props;

        apiService.getByNext(apiService.endpoints.category, language, loadCategories);
        apiService.getByNext(apiService.endpoints.meta, language, loadMeta);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.meta[0] && this.props.meta[0] && prevProps.meta[0].language.id !== this.props.meta[0].language.id) {
            this.setState({metaIdMap: _.chain(this.props.meta).keyBy('languageVariation').mapValues('id').value()})
        }


        // SearchQuery is changed
        const languageIsChanged = prevProps.searchQuery.language !== this.props.searchQuery.language;
        const titleIsChanged = prevProps.searchQuery.title !== this.props.searchQuery.title;
        const metaIsChanged =  prevProps.searchQuery.meta.length !== this.props.searchQuery.meta.length
                            || prevProps.searchQuery.meta.filter(x => !this.props.searchQuery.meta.includes(x)).length > 0;
        const pageIsChanged = prevProps.searchQuery.page !== this.props.searchQuery.page;

        if (languageIsChanged) {
            this.loadFilterData();
        }

        if(languageIsChanged || titleIsChanged || metaIsChanged || pageIsChanged) {
            this.search();
        }
    }


    searchConcepts() {
        const {apiService,  searchQuery: {language, meta, page, pageSize, title}} = this.props;
        this.props.updateIsSearching(true);

        const query = new URLSearchParams();
        query.append("language", language);
        query.append("page", page);
        query.append("pageSize", pageSize);
        if (title)
            query.append("title", title);
        meta.forEach(meta => query.append("meta", this.state.metaIdMap[meta]));

        apiService.searchForConcepts(query.toString())
            .then(({results, ...rest}) => {
                this.props.updateIsSearching(false);
                this.props.updateSearchResult({items: results, ...rest});
                this.mapResultsToListView(results)
                    .then(items => this.props.updateSearchResult({items, ...rest}))
                    .catch(() => {});
            });

    }

    mapResultsToListView(list) {
        return Promise.all(list.map(concept => new Promise((resolve, reject) => {

            const {media} = concept;

            if (!media || media.length === 0)
                resolve(concept);

            const image = media.find(x => x.mediaType.typeGroup.name.toLowerCase() === "image");
            if (!image)
                resolve(concept);


            // TODO IMAGE_ID_NOT_VALID_BUG fix when all media ids from old list api is valid ids..
            resolve({
                ...concept,
                previewImage: this.props.imageApi.getPreviewLink(image.externalId),
                previewAltText: "no alt text",
            })
        })));
    }

    onPageClick({page}) {
        this.props.updateSearchQuery({page});
    }

    onChange(values, value) {
        this.props.updateSearchQuery({meta: values, page: 1});
    }

    onTermChange(newTerm) {
        this.props.updateSearchQuery({title: newTerm, page: 1});
    }

    onRemoveTag(languageVariation) {
        const {searchQuery: {meta}} = this.props;

        this.props.updateSearchQuery({meta: meta.filter(x => x !== languageVariation), page: 1});
    }

    onToggleFilter() {
        this.setState(prev => ({showFilter: !prev.showFilter}));
    }

    onLanguageChange(abbreviation) {
        this.props.updateSearchQuery({language: abbreviation, page: 1});
    }

    render(){
        const {categories, meta, t, match, isSearching, searchResult, searchQuery} = this.props;
        const languages = meta.filter(x => x.category.typeGroup.name.toLowerCase() === "language").map(x => ({...x, title: x.name, value: x.languageVariation}));
        const options   = meta.filter(x => x.category.typeGroup.name.toLowerCase() !== "language").map(x => ({...x, title: x.abbreviation || x.name, value: x.languageVariation}));
        const breadCrumbs = [
            {to: indexRoute(), name: t('indexPage.title')},
            {to: searchRoute(), name: t('searchPage.title')},
        ];

        return (
            <PageContainer backgroundWide >

                <Helmet title={t('searchPage.title')} />
                <Content>
                    {Boolean(languages.length) && <MetaFilter values={searchQuery.meta}
                                                              t={t}
                                                              onChange={this.onChange}
                                                              categories={categories.filter(x => x.typeGroup.name.toLowerCase() !== "language") || []}
                                                              options={options}
                                                              onChangeLanguage={this.onLanguageChange}
                                                              languageOptions={languages}
                                                              languageDefault={languages.find(x => x.abbreviation === searchQuery.language)}
                                                              isOpen={this.state.showFilter}/>}

                    <div {...classes('content')}>

                        <div {...classes('menu-toggle')}>
                            {this.state.showFilter ?  <Cross onClick={this.onToggleFilter} /> : <Filter onClick={this.onToggleFilter} />}
                        </div>
                        <OneColumn>

                            <Breadcrumb items={breadCrumbs}/>
                            <div {...classes('search-field')}>
                                <AutoComplete onChange={this.onTermChange}
                                              value={searchQuery.title}
                                              onSelect={this.onTermChange}
                                              items={[]}
                                              placeholder={t("searchPage.title")}
                                />
                                <Button {...classes('submit-button')}>
                                    <Search />
                                </Button>
                            </div>
                            <p {...classes('search-tip')}>{t('searchPage.tips')}</p>
                            <ListHeader searchResult={searchResult}
                                        searchQuery={searchQuery}
                                        meta={meta}
                                        isSearching={isSearching}
                                        values={searchQuery.meta}
                                        options={options}
                                        sidebarOpen={!this.state.showFilter}
                                        onRemoveTag={this.onRemoveTag}
                                        t={t}/>
                        </OneColumn>
                        <ListView items={searchResult.items}
                                  page={searchResult.page}
                                  lastPage={searchResult.numberOfPages}
                                  match={match}
                                  onPagerClick={this.onPageClick} />
                    </div>
                </Content>
            </PageContainer>
        );
    }
}


export const searchResultProps = {
    items: PropTypes.arrayOf(PropTypes.shape(conceptProps)),
    page: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
};

export const searchQueryProps = {
    meta: PropTypes.arrayOf(PropTypes.string),
    page: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
};

SearchContainer.defaultProps = {
    categories: [],
    meta: [],
    isSearching: false,
};


SearchContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
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
    searchQuery: PropTypes.shape(searchQueryProps).isRequired,
    updateSearchQuery: PropTypes.func.isRequired,
    updateIsSearching: PropTypes.func.isRequired,
    searchResult: PropTypes.shape(searchResultProps).isRequired,

    // Optional
    categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)),
    meta: PropTypes.arrayOf(PropTypes.shape(metaProps)),
    isSearching: PropTypes.bool,
};

export default compose(
    withRouter,
    withAuthenticationService,
    connect(mapStateToProps, {loadMeta, loadCategories, updateSearchResult, loginSuccess, updateIsSearching, updateSearchQuery}),
    withApiService,
    injectT,
)(SearchContainer);

