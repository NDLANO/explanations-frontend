/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import BEMHelper from "react-bem-helper";
import {Field, reduxForm} from "redux-form";
import PropTypes from 'prop-types';
import Button from '@ndla/button';
import {Search as SearchIcon} from "@ndla/icons/es/common";

import {FIELDS} from "./fields";
import {createSearchQueryFromValues, onChange} from "./onChange";

const classes = new BEMHelper({
    name: 'search-form',
    prefix: 'c-',
});

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
        const query = createSearchQueryFromValues(values);
        if (query)
            this.props.search(query);
    }

    render() {
        const {languages, subjects, t, autoComplete ,handleSubmit} = this.props;
        return (

            <form {...classes()} onSubmit={handleSubmit(this.onSearch)}>
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
                       options={languages}/>
                <Field {...FIELDS.subject}
                       t={t}
                       options={subjects}/>
            </form>
        );
    }
}

SearchForm.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    subjects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    autoComplete: PropTypes.array.isRequired,
};

SearchForm.defaultProps = {
    autoComplete: []
};

export const SEARCH_FORM_NAME = 'searchForm';

export default reduxForm({
    form: SEARCH_FORM_NAME,
    onChange
})(SearchForm);