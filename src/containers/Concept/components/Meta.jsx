/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import {Field} from "redux-form";
import PropTypes from 'prop-types';

import {capitalizeText} from "../../../utilities";
import FormSelect from "../../../components/FormSelect";

export const metaNamePrefix = (name) => `meta_${name}`;

const Meta = ({category: {canHaveMultiple,isRequired, label, typeGroup: {name}}, t, options, onChange, isDisabled, className}) => (
    <div className={className}>
        <label>{capitalizeText(label.toLowerCase())} {isRequired ? '*' : ''}</label>
        <Field name={metaNamePrefix(name.toLowerCase())}
               isDisabled={isDisabled}
               component={FormSelect}
               isSearcable={true}
               placeholder={t('phrases.choose')}
               isMulti={canHaveMultiple}
               key={metaNamePrefix(name.toLowerCase())}
               onChange={onChange}
               options={options}/>
    </div>
);

Meta.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    category: PropTypes.shape({
        typeGroup: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        canHaveMultiple: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

    // Optional
    isDisabled: PropTypes.bool,
    options: PropTypes.array
};

Meta.defaultProps = {
    isDisabled: false,
    options: []
};

export default Meta;