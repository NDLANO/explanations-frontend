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
import {capitalizeText} from "../../../utilities";

const metaNamePrefix = (name) => `meta_${name}`;

const Meta = ({meta, t, classes, readOnly, initialValues}) =>
        <div {...classes('form-field')}>
            <label>{capitalizeText(meta.category.description.toLowerCase())}</label>
            <Field name={metaNamePrefix(meta.category.name.toLowerCase())}
                   readOnly={readOnly}
                   component={Dropdown}
                   id={meta.category.id}
                   isSearcable={true}
                   isMultiSelect={meta.category.canHaveMultiple}
                   t={t}
                   selected={initialValues[metaNamePrefix(meta.category.name.toLowerCase())]}
                   options={meta.metaList.map(x => ({value: x.id, label: x.name}))}/>
        </div>;

Meta.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    classes: PropTypes.func.isRequired,

    // Optional
    readOnly: PropTypes.bool
};

Meta.defaultProps = {
    readOnly: false
};

export default Meta;