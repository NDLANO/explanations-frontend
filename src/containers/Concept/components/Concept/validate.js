/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import _ from 'lodash';
import {FIELDS} from './fields'

export const validate = (values) => {
    const errors = {};
    _.each(FIELDS, field => {
        if (!values[field.name] && field.required)
            errors[field.name] = "conceptForm.requiredField";
    });

    return errors;
};