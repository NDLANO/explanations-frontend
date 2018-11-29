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
        if (value) {
            if (this.props.input)
                this.props.input.onChange(value);
            if (this.props.onChange)
                this.props.onChange(value);
        }
    }

    onBlur() {
        if (this.state.selected) {
            if (this.props.input)
                this.props.input.onChange(this.state.selected);
            if (this.props.onChange)
                this.props.onChange(this.state.selected);
        }
    }

    render() {
        const {input, placeholder, t, readOnly, ...rest} = this.props;
        return <Select {...input}
                       {...rest}
                       {...classes()}
                        classNamePrefix={classes().className}
                       placeholder={t(placeholder)}
                       onBlur={this.onBlur}
                       value={this.state.selected}
                       onChange={this.onChange}
                       isDisabled={readOnly}
                />
    }
}

Dropdown.propTypes = {
    t: PropTypes.func.isRequired,
    input: PropTypes.object,
    isSearchable: PropTypes.bool,
    isClearable: PropTypes.bool,
    placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
    isSearchable: true,
    isClearable: false,
    placeholder: 'dropdown.placeholder',
};

export default Dropdown;