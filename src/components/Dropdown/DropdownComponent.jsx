/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import BEMHelper from "react-bem-helper";
import PropTypes from "prop-types";
import Select from "react-select";

const classes = new BEMHelper({
    name: 'dropdown',
    prefix: 'c-',
});

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        const {selected, input: {value} = {value: ''}} = this.props;
        this.state = {selected: selected || value};

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(value) {
        this.setState({selected: value});
        if (value) {
            if (this.props.input)
                this.props.input.onChange(value);
            if (this.props.onChange)
                this.props.onChange(value);
        }
    }

    onBlur() {

    }

    render() {
        const {input, placeholder, t,isMultiSelect, readOnly, ...rest} = this.props;
        return <Select {...input}
                       {...rest}
                       {...classes()}
                       classNamePrefix={classes().className}
                       placeholder={t(placeholder)}
                       onBlur={this.onBlur}
                       value={this.state.selected}
                       onChange={this.onChange}
                       isDisabled={readOnly}
                       isMulti={isMultiSelect}
                />
    }
}

const dropdownElementShape = PropTypes.shape({
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    label: PropTypes.string.isRequired,
});

Dropdown.propTypes = {
    // Required
    t: PropTypes.func.isRequired,

    // Optional
    input: PropTypes.object,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    isClearable: PropTypes.bool,
    isSearchable: PropTypes.bool,
    isMultiSelect: PropTypes.bool,
    placeholder: PropTypes.string,
    selected: PropTypes.oneOfType([
        dropdownElementShape,
        PropTypes.arrayOf(dropdownElementShape)
    ]),
    options: PropTypes.arrayOf(dropdownElementShape)
};

Dropdown.defaultProps = {
    readOnly: false,
    isSearchable: true,
    isClearable: false,
    isMultiSelect: false,
    placeholder: 'dropdown.placeholder',
    options: []
};

export default Dropdown;