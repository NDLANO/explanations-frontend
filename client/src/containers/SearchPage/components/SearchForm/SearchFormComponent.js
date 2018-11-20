import React from 'react';
import SearchField from "../SearchField";
import BEMHelper from "react-bem-helper";
import './style.css';
import SearchDropdown from "../SearchDropdown";
import {createGetParam, createMetaGetParam} from "../../../../utilities";
import {debounce} from 'lodash';
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
            searchTerm: "",
            language: props.languages.find(x => x.abbreviation === props.locale) || lang,
            subject: sub,
            matchedTitles: []
        };

        this.onSearch = this.onSearch.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
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


    onChange(key, metaId) {
        const meta = this.props[key + "s"].find(x => x.id+"" === metaId);
        this.setState({[key]: meta}, () => this.search());
    }


    onSearchFieldChange = (searchTerm) => {
        if (searchTerm.length > 0 && searchTerm !== this.state.searchTerm){
            this.setState({
                searchTerm: searchTerm,
                matchedTitles: this.props.conceptTitles
                    .filter(x => x.toLowerCase().includes(searchTerm.toLowerCase()))
            },
                () => this.search());
        }
        else
            this.setState({searchTerm: searchTerm})

    }

    render() {
        const {languages, subjects, t} = this.props;

        return (

            <form {...classes()} onSubmit={this.onSearch}>
                <h1>{t('search.title')}</h1>
                <SearchField onChange={this.onSearchFieldChange}
                             onSelect={this.onSearchFieldChange}
                             value={this.state.searchTerm}
                             items={this.state.matchedTitles}
                            placeholder={t('search.input.placeholder')}/>
                <SearchDropdown items={languages}
                          selected={this.state.language}
                          onChange={(e) => this.onChange("language",e.target.value)}
                          id="languages"
                          classes={classes('filter-dropdown')} />
                <SearchDropdown items={subjects}
                          selected={this.state.subject}
                          onChange={(e) => this.onChange("subject",e.target.value)}
                          id="subjects"
                          classes={classes('filter-dropdown')} />
            </form>
        );
    }
}

export default SearchForm;