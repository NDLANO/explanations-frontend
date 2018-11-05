import React from 'react';
import SearchField from "../SearchField";
import BEMHelper from "react-bem-helper";

import './style.css';
import Dropdown from "../../../../components/Dropdown";

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        let [lang=null] = props.languages;
        const [sub=null] = props.subjects;

        this.state = {
            term: "",
            language: props.languages.find(x => x.abbreviation === props.locale) || lang,
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
          let query = this.createMetaGetParamWithObjects("", "language", this.state.language.name);
          query += this.createMetaGetParamWithObjects(query, "subject", this.state.subject.name);
          query += this.createGetParam(query, "title", this.state.term);
*/
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

        if (id === -1)
            return '';

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
        this.setState({[key]: meta});
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
                <Dropdown items={languages} selected={this.state.language} onChange={(e) => this.onChange("language",e.target.value)} id="languages" classes={classes('filter-dropdown')} />
                <Dropdown items={subjects} selected={this.state.subject} onChange={(e) => this.onChange("subject",e.target.value)} id="subjects" classes={classes('filter-dropdown')} />
            </div>
        );
    }
}

export default SearchForm;