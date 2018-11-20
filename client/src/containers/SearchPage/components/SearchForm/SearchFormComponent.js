import React from 'react';
import BEMHelper from "react-bem-helper";
import {createGetParam, createMetaGetParam} from "../../../../utilities";
import {debounce} from 'lodash';
import {Field, reduxForm} from "redux-form";
import {FIELDS} from "./fields";


import './style.css';

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
            language: props.languages.find(x => x.abbreviation === props.locale) || lang,
            subject: sub,
        };

        this.onSearch = this.onSearch.bind(this);
        this.onLanguageFieldChange = this.onLanguageFieldChange.bind(this);
        this.onSubjectFieldChange = this.onSubjectFieldChange.bind(this);

        this.search = debounce(this.search,300);
    }

    onLanguageFieldChange(e){
        this.setState({language: e.target.value})
    }
    onSubjectFieldChange(e){
        this.setState({subject: e.target.value})
    }

    onSearch(e){
        e.preventDefault();
        this.search();
    }

    search() {
        let query = createMetaGetParam("",this.state.language.id);
        query += createMetaGetParam(query, this.state.subject.id);
        query += createGetParam(query, "title", this.state.searchTerm);

        console.log("searchquery", query);
        this.props.search(query);
    }

    render() {
        const {languages, subjects, t} = this.props;
        console.log(subjects)
        return (

            <form {...classes()} onSubmit={this.onSearch}>
                <h1>{t('search.title')}</h1>
                <Field items={this.props.conceptTitles}
                       placeholder={t('search.input.placeholder')}
                       {...FIELDS.conceptTitle}/>

                {/*
                <Dropdown options={languages.map(x => ({value: x.id, label: x.name}))}
                          selected={this.state.language}
                          onChange={(e) => this.onChange("language",e.target.value)}
                          id="languages"
                          t={t}
                          classes={classes('filter-dropdown')} />
                <Dropdown options={subjects.map(x => ({value: x.id, label: x.name}))}
                          selected={{value: this.state.subject.id, label: this.state.subject.name}}
                          onChange={(e) => this.onChange("subject",e.target.value)}
                          id="subjects"
                          t={t}
                          classes={classes('filter-dropdown')} />
                */}

            </form>
        );
    }
}

export default reduxForm({
    form: 'conceptForm'
})(SearchForm);