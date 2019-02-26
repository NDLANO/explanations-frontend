/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {fieldInputShape} from '../utilities/commonShapes';

class FormSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(value) {
        const {multi, input: {onChange}} = this.props;
        if (multi)
            return onChange(value.map(value => value.value));
        return onChange(value ? value.value : '');
    }

    getValue() {
        const {multi, input: {value}} = this.props;
        if (multi)
            return typeof value === 'string' || typeof value === 'number' ? [] : this.filteredOptions();
        return this.filteredOptions()[0];
    }

    onBlur() {
        this.props.input.onBlur(this.props.input.value);
    }

    filteredOptions() {
        const {multi, options, input: {value}} = this.props;

        return options.filter(option => multi
            ? value.indexOf(option.value) !== -1
            : option.value === value
        )
    }

    render() {
        const { input: { name, onFocus }, ...props } = this.props;
        return (
            <Select
                {...props}
                name={name}
                onFocus={onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur}
                value={this.getValue()}
            />
        )
    }
}

FormSelect.defaultProps = {
    options: [],
    multi: false,
    className: "",
    isDisabled: false,
    valueKey: "value",
};

FormSelect.propTypes = {
    // Required
    input: fieldInputShape.isRequired,

    // Optional
    multi: PropTypes.bool,
    options: PropTypes.array,
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    valueKey: PropTypes.string,
};

export default FormSelect;



