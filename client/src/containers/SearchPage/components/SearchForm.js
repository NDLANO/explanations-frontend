import React from 'react';
import SearchField from "./SearchField";
import BEMHelper from "react-bem-helper";

import {Search as SearchIcon,} from 'ndla-icons/common';
import { Subject as SubjectIcon} from 'ndla-icons/contentType';

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term: "",
            language: "",
            subject: ""
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

        let query = this.createGetParam("", "language", this.state.language);
        query += this.createGetParam(query, "subject", this.state.subject);
        query += this.createGetParam(query, "title", this.state.term);

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


    render() {
        const {t} = this.props;

        return (
            <div {...classes()}>
                <SearchField placeholder={t('search.concept.placeholder')}
                             value={this.state.term}
                             onSearch={this.onSearch}
                             onChange={this.onSearchFieldChange}
                             id="search-concepts"
                             autoCompleteResults={["aj", "ad"]}
                             {...classes('inputfield')}
                             icon={<SearchIcon />}
                />
                <div {...classes('filter')}>
                    <SearchField placeholder={t('search.language.placeholder')}
                                 value={this.state.language}
                                 onSearch={this.onSearch}
                                 onChange={this.onLanguageFieldChange}
                                 id="search-language"
                                 {...classes('inputfield')}
                    />
                    <SearchField placeholder={t('search.subject.placeholder')}
                                 value={this.state.subject}
                                 onSearch={this.onSearch}
                                 onChange={this.onSubjectFieldChange}
                                 id="search-subject"
                                 {...classes('inputfield')}
                                 icon={<SubjectIcon />}
                    />
                </div>
            </div>
        );
    }
}

export default SearchForm;