import React from 'react';
import BEMHelper from "react-bem-helper";
import {debounce} from 'lodash';
import {Field, reduxForm} from "redux-form";
import {FIELDS} from "./fields";


import './style.css';
import {Button} from "ndla-ui";
import {Search as SearchIcon} from "ndla-icons/es/common";

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.submitButton = this.submitButton.bind(this);
        this.onSearch = debounce(this.onSearch,300);
    }

    submitButton(e) {
        e.preventDefault();
        this.onSearch();
    }

    onSearch() {
        if(!this.props.formValues)
            return;

        const {title, ...rest} = this.props.formValues;

        let query = "?";
        if (title)
            query += `title=${title}&`;

        query += Object.values(rest).map(x => x > -1 ? `meta=${x}&` : '').join('');

        console.log("searchquery", query);
        this.props.search(query);
    }

    render() {
        const {languages, subjects, t, initialValues, conceptTitles, formValues} = this.props;

        let autoComplete = [];
        if(formValues && formValues.title)
            autoComplete = conceptTitles.filter(x => x.toLowerCase().includes(formValues.title.toLowerCase()));

        return (

            <form {...classes()} onSubmit={this.onSearch}>
                <h1>{t('search.title')}</h1>
                <div {...classes('search-field')}>
                    <Field items={autoComplete}
                           placeholder={t('search.input.placeholder')}
                           {...FIELDS.title}
                           onChange={this.onSearch}/>

                    <Button submit={true}
                            {...classes('submit-button')}
                            onClick={this.submitButton}>
                        <SearchIcon />
                    </Button>
                </div>

                <Field {...FIELDS.language}
                       t={t}
                       selected={languages.find(x => x.value === initialValues.language)}
                       options={languages}
                       onChange={this.onSearch}/>
                <Field {...FIELDS.subject}
                       t={t}
                       selected={subjects.find(x => x.value === -1)}
                       options={subjects}
                       onChange={this.onSearch}/>

            </form>
        );
    }
}

export default reduxForm({
    form: 'conceptForm'
})(SearchForm);