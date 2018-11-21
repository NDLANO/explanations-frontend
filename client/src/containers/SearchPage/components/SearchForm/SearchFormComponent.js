import React from 'react';
import BEMHelper from "react-bem-helper";
import {debounce} from 'lodash';
import {Field, reduxForm} from "redux-form";
import PropTypes from 'prop-types';
import {Button} from "ndla-ui";
import {Search as SearchIcon} from "ndla-icons/es/common";

import {FIELDS} from "./fields";
import './style.css';

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});


const createSearchQueryFromValues = values => {
    const {title, ...rest} = values;

    let query = "?";
    if (title)
        query += `title=${title}&`;

    query += Object.values(rest).map(x => x > -1 ? `meta=${x}&` : '').join('');

    console.log("searchquery", query);
    return query;
}

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        this.onSearch = this.onSearch.bind(this);
        this.submitButton = this.submitButton.bind(this);
    }

    submitButton(e) {
        e.preventDefault();
        this.onSearch();
    }

    onSearch(values) {
        this.props.search(createSearchQueryFromValues(values));
    }

    render() {
        const {languages, subjects, t, initialValues, autoComplete ,handleSubmit} = this.props;
        return (

            <form {...classes()} onSubmit={handleSubmit(this.onSearch)}>
                <h1>{t('search.title')}</h1>
                <div {...classes('search-field')}>
                    <Field items={autoComplete}
                           {...FIELDS.title}
                           placeholder={t(FIELDS.title.placeholder)}/>
                    <Button submit={true} {...classes('submit-button')}>
                        <SearchIcon />
                    </Button>
                </div>

                <Field {...FIELDS.language}
                       t={t}
                       selected={languages.find(x => x.value === initialValues.language)}
                       options={languages}/>
                <Field {...FIELDS.subject}
                       t={t}
                       selected={subjects.find(x => x.value === -1)}
                       options={subjects}/>
            </form>
        );
    }
}

SearchForm.propTypes = {
    // Required
    search: PropTypes.func.isRequired,
    languages: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
    autoComplete: PropTypes.array.isRequired,

    // Optional
    initialValues: PropTypes.object,
};

SearchForm.defaultProps = {
    autoComplete: []
};

let timeout = null;
export default reduxForm({
    form: 'conceptForm',
    onChange: (values, dispatch, props, previousValues) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => props.search(createSearchQueryFromValues(values)), 300);
    },
})(SearchForm);