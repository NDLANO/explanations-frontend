/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const FormSelect = ({ input: { name, value, onBlur, onChange, onFocus }, options, multi, ...props }) => (
    <Select
        name={name}
        multi={multi}
        onFocus={onFocus}
        options={options}
        onChange={multi
            ? values => onChange(values.map(value => value.value))
            : value => onChange(value ? value.value : '')
        }
        onBlur={() => onBlur(value)}
        value={transformValue(value, options, multi)}
        {...props}
    />
);

FormSelect.defaultProps = {
    multi: false,
    className: "",
    valueKey: "value",
    options: []
};

FormSelect.propTypes = {
    // Required
    input: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        onBlur: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
    }).isRequired,

    // Optional
    multi: PropTypes.bool,
    options: PropTypes.array,
    className: PropTypes.string,
    valueKey: PropTypes.string,
};

export default FormSelect;


const transformValue = (value, options, multi) => {
    const filteredOptions = options.filter(option => multi
        ? value.indexOf(option.value) !== -1
        : option.value === value
    );

    if (!multi) {
        return filteredOptions[0];
    }

    return typeof value === 'string' ? [] : filteredOptions;
};