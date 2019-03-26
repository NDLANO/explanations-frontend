/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {RadiobuttonItem} from "@ndla/forms";
import { SearchFilter } from '@ndla/ui';
import BEMHelper from "react-bem-helper";
import Divider from "../Divider";
import {categoryProps} from "../../utilities/commonProps";

const classes = new BEMHelper({
    name: 'meta-filter',
    prefix: 'c-',
});

class MetaFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: props.languageDefault,
        };

        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.filterOptionsOnCategory = this.filterOptionsOnCategory.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!prevProps.languageDefault && this.props.languageDefault)
            this.setState({language: this.props.languageDefault});
    }

    onChangeLanguage(abbreviation) {
        this.setState(
            {language: this.props.languageOptions.find(x => x.abbreviation === abbreviation)},
            this.props.onChangeLanguage.bind(null, abbreviation)
        );
    }

    renderLanguages() {
        if (!this.state.language)
            return null;

        return (
            <React.Fragment>
                <div {...classes('language', '', "c-filter__list c-filter__list--search")}>
                    <h1 className="c-filter__label">{this.state.language.category.name}</h1>
                    <ul className="c-filter__item-wrapper c-filter__item-wrapper--aligned-grouping">
                        {_.orderBy(this.props.languageOptions, ['name'],['asc'])
                            .map(x => (
                                <li key={x.id}>
                                    <RadiobuttonItem checked={x.languageVariation === this.state.language.languageVariation}
                                                     label={x.name}
                                                     id={x.abbreviation}
                                                     value={x.id}
                                                     onChange={this.onChangeLanguage} />
                                </li>
                            ))}
                    </ul>
                </div>

                <Divider />
            </React.Fragment>
        )
    }

    filterOptionsOnCategory(id) {
        return _.orderBy(this.props.options.filter(x => x.category.typeGroup.id === id), ['name'], ['asc'])
    }


    render() {
        const {categories, onChange, values, isOpen, visibleFilterCount, t} = this.props;
        return (
            <div {...classes()} style={{display: isOpen ? "block" : "none"}}>
               {this.renderLanguages()}
                {categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <SearchFilter label={category.name}
                                      options={this.filterOptionsOnCategory(category.typeGroup.id)}
                                      defaultVisibleCount={visibleFilterCount}
                                      onChange={onChange}
                                      values={values}
                                      showLabel={t('phrases.show')}
                                      hideLabel={t('phrases.hide')}
                        />
                        {index < categories.length && <Divider/>}
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

const metaItem = PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
});

MetaFilter.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)).isRequired,
    onChangeLanguage: PropTypes.func.isRequired,

    // Optional
    isOpen: PropTypes.bool,
    values: PropTypes.arrayOf(PropTypes.string),
    visibleFilterCount: PropTypes.number,
    options: PropTypes.arrayOf(metaItem),
    languageOptions: PropTypes.arrayOf(metaItem),
    languageDefault: metaItem,
};

MetaFilter.defaultProps = {
    values: [],
    options: [],
    language: [],
    isOpen: false,
    visibleFilterCount: 1
};


export default MetaFilter;
