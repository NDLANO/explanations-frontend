import React from "react";
import BEMHelper from "react-bem-helper";

import './style.css'

import PropTypes from "prop-types";
import Select from "react-select";

const classes = new BEMHelper({
    name: 'dropdown',
    prefix: 'c-',
});

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        const {selected} = this.props;
        this.state = {selected};

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(value) {
        this.setState({selected: value});
        if (value)
            this.props.input.onChange(value.value);
    }

    onBlur() {
        if (this.state.selected)
            this.props.input.onChange(this.state.selected.value)
    }

    render() {
        const {input, placeholder, t, ...rest} = this.props;
        return <Select
            {...input}
            {...rest}
            {...classes()}
            placeholder={t(placeholder)}
            onBlur={this.onBlur}
            value={this.state.selected}
            onChange={this.onChange}
        />
    }
}

Dropdown.propTypes = {
    input: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,
    placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
    isSearchable: true,
    isClearable: true,
    placeholder: 'dropdown.placeholder',
};

export default Dropdown;