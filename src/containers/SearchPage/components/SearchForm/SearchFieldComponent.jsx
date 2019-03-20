/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

import AutoComplete from "../../../../components/AutoComplete/AutoCompleteComponent";


const SearchField  = ({input, ...rest}) =>
    <AutoComplete onChange={(value) => input.onChange(value)}
                  value={input.value}
                  onSelect={(value) => input.onChange(value)}
                  {...rest}/>;

SearchField.propTypes = {
    // Required
    input: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,

    // Optionals
    placeholder: PropTypes.string
};

SearchField.defaultProps = {
    items: [],
    placeholder: '',
};

export default SearchField;