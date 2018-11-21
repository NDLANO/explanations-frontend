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