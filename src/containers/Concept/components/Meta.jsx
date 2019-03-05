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

import Dropdown from "../../../components/Dropdown";

export const metaNamePrefix = (name) => `meta_${name}`;
export const dropdownFormat = ({id, name, languageVariation}, type="NO_TYPE") => ({value: languageVariation, id, languageVariation, label: name, type: type}); //`${id}_${languageVariation}`

const Meta = ({meta, name, label, isMultiSelect, t, classes, readOnly, options, onChange}) => (
        <div {...classes('form-field')}>
            <label>{label}</label>
            <Field name={name}
                   readOnly={readOnly}
                   component={Dropdown}
                   isSearcable={true}
                   isMultiSelect={isMultiSelect}
                   t={t}
                   onChange={onChange}
                   selected={meta ? dropdownFormat(meta, meta.category.typeGroup.name): null}
                   options={options.map(x => dropdownFormat(x, x.category.typeGroup.name))}/>
        </div>);

Meta.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    meta: PropTypes.shape({
        category: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,

    // Optional
    readOnly: PropTypes.bool,
    options: PropTypes.array
};

Meta.defaultProps = {
    readOnly: false,
    options: []
};

export default Meta;