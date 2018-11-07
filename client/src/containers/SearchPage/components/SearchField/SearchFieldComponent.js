import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

import {Button} from "ndla-ui";
import {Search as SearchIcon} from "ndla-icons/es/common";

import './style.css';
import AutoComplete from "../../../../components/AutoComplete/AutoCompleteComponent";

const classes = new BEMHelper('c-search-field');

class SearchField extends React.Component {
    render() {
        const {icon, onChange, onSelect, value, items} = this.props;
        return (
            <div {...classes()}>
                <AutoComplete onChange={onChange}
                              value={value}
                              onSelect={onSelect}
                              items={items}/>
                <Button submit={true}
                        {...classes('submit-button')}>
                    {icon}
                </Button>
            </div>
        );
    }
}

SearchField.propTypes = {
    // Required
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,
};

SearchField.defaultProps = {
    icon: <SearchIcon />
};

export default SearchField;