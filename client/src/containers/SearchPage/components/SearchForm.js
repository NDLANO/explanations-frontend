import React from 'react';
import SearchField from "./SearchField";
import BEMHelper from "react-bem-helper";

import {Search as SearchIcon,} from 'ndla-icons/common';
import Meta from "../../UpdatePage/components/Meta";

import './searchForm.css';
import DropDown from "../../UpdatePage/components/DropDown";

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        const [lang=null, ...rest] = this.props.languages;
        const [sub=null, ...subRest] = this.props.subjects;

        this.state = {
            term: "",
            language: lang,
            subject: sub
        };

        this.onSearch = this.onSearch.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.onLanguageFieldChange = this.onLanguageFieldChange.bind(this);
        this.onSubjectFieldChange = this.onSubjectFieldChange.bind(this);
    }

    onSearchFieldChange(e){
        this.setState({term: e.target.value})
    }
    onLanguageFieldChange(e){
        this.setState({language: e.target.value})
    }
    onSubjectFieldChange(e){
        this.setState({subject: e.target.value})
    }

    onSearch(e){
        e.preventDefault();

     let query = this.createMetaGetParam("",this.state.language.id);
        query += this.createMetaGetParam(query, this.state.subject.id);
        query += this.createGetParam(query, "title", this.state.term);
        /*   
                let query = this.createMetaGetParamWithObjects("", "languages", this.state.language);
                query += this.createMetaGetParamWithObjects(query, "subjects", this.state.subject);
                query += this.createGetParam(query, "title", this.state.term);*/

        console.log(query);
        this.props.search(query);
    }

    createGetParam(query, key, prop) {
        if(!prop)
            return "";

        const param = `${key}=${prop}`;
        if (query)
            return `&${param}`;
        else
            return`?${param}`;

    }

    createMetaGetParam(query, id) {

        const param = `meta=${id}`;
        if (query)
            return `&${param}`;
        else
            return`?${param}`;

    }

    createMetaGetParamWithObjects(query, key, prop) {
        if(!prop)
            return "";

        let object = {
            "category": key,
            "name": prop
        };

        const param = `meta=${encodeURI(JSON.stringify(object))}`;
        if (query)
            return `&${param}`;
        else
            return`?${param}`;

    }

    onChange(key, metaId) {
        const meta = this.props[key + "s"].find(x => x.id+"" === metaId);
        console.log(key, metaId, meta, typeof metaId)
        this.setState((state) => ({[key]: meta}));
    }


    render() {
        const {t, languages, subjects} = this.props;

        return (
            <div {...classes()}>
                <SearchField placeholder={t('search.concept.placeholder')}
                             value={this.state.term}
                             onSearch={this.onSearch}
                             onChange={this.onSearchFieldChange}
                             id="search-concepts"
                             {...classes('inputfield')}

                />
                <DropDown items={languages} selected={this.state.language} onChange={(e) => this.onChange("language",e.target.value)} id="languages" classes={classes('filter-dropdown')} />
                <DropDown items={subjects} selected={this.state.subject} onChange={(e) => this.onChange("subject",e.target.value)} id="subjects" classes={classes('filter-dropdown')} />
            </div>
        );
    }
}

export default SearchForm;