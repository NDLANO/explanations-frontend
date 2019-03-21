/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import Select from 'react-select';
import BEMHelper from "react-bem-helper";
import PropTypes, {number, oneOfType, string} from 'prop-types';
import {fieldInputProps} from '../../utilities/commonShapes';


const classes = new BEMHelper({
    name: 'form-select',
    prefix: 'c-',
});

class FormSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    onChange(value) {
        const {isMulti, input: {onChange}} = this.props;
        if (isMulti)
            return onChange(value.map(x => x.value));
        if (value)
            return onChange(value.value);
        else
            return onChange(null);
    }

    getValue() {
        const {isMulti, input: {value}} = this.props;
        if (isMulti)
            return typeof value === 'string' || typeof value === 'number' ? [] : this.filteredOptions();

        return this.filteredOptions()[0];
    }


    filteredOptions() {
        const {isMulti, options, input: {value}} = this.props;
        return options.filter(option => isMulti
            ? value.indexOf(option.value) !== -1
            : option.value === value
        )
    }

    render() {
        const { meta, input: { name, onFocus }, input, ...props } = this.props;
        return (
            <div {...classes('wrapper')}>
                <Select
                    {...props}
                    {...classes()}
                    name={name}
                    onFocus={onFocus}
                    onChange={this.onChange}
                    value={this.getValue()}
                />
                {meta.touched && meta.error
                    ? <span className="validation-error" {...input}>
                    {meta.error}
                    </span>
                    : null}
            </div>
        )
    }
}

FormSelect.defaultProps = {
    options: [],
    isMulti: false,
    className: "",
    isClearable: true,
    isDisabled: false,
    valueKey: "value",
    clearValue: () => console.log("LCEAR")
};

FormSelect.propTypes = {
    // Required
    input: PropTypes.shape({
        ...fieldInputProps,
        value: oneOfType([
            string,
            number,
            PropTypes.array
        ]).isRequired
    }).isRequired,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.string
    }).isRequired,
    clearValue: PropTypes.func.isRequired,

    // Optional
    isMulti: PropTypes.bool,
    options: PropTypes.array,
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    valueKey: PropTypes.string,
    placeholder: PropTypes.string,
    isClearable: PropTypes.bool,
};

export default FormSelect;



