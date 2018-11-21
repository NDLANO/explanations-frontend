import React from 'react';
import PropTypes from 'prop-types';

import AutoComplete from "../../../../components/AutoComplete/AutoCompleteComponent";


const SearchField  = ({input, ...rest}) =>
    <AutoComplete onChange={(value) => input.onChange(value)}
                  value={input.value}
                  onSelect={(value) => input.onChange(value)}
                  {...rest}/>

SearchField.propTypes = {
    // Required
    items: PropTypes.array.isRequired,

    // Optionals
    placeholder: PropTypes.string
};

SearchField.defaultProps = {
    placeholder: '',
    items: []
};

export default SearchField;