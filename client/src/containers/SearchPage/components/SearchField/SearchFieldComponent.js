import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

import {Button} from "ndla-ui";
import {Search as SearchIcon} from "ndla-icons/es/common";

import './style.css';
import AutoComplete from "../../../../components/AutoComplete/AutoCompleteComponent";

const classes = new BEMHelper('c-search-field');

const SearchField  = ({icon, input, onSelect, items=[], placeholder}) =>  {
    let itemsList = [];
    if (input.value)
        itemsList = items.filter(x => x.toLowerCase().includes(input.value.toLowerCase()));
    return (
        <div {...classes()}>
            <AutoComplete onChange={(value) => input.onChange(value)}
                          value={input.value}
                          onSelect={(value) => input.onChange(value)}
                          items={itemsList}
                          placeholder={placeholder}/>
            <Button submit={true}
                    {...classes('submit-button')}>
                {icon}
            </Button>
        </div>
    )
};

SearchField.propTypes = {
    // Required
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,

    // Optionals
    placeholder: PropTypes.string
};

SearchField.defaultProps = {
    icon: <SearchIcon />,
    placeholder: ''
};

export default SearchField;