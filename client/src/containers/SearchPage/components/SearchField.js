import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

import {ActiveFilters} from "ndla-ui";
import {Search as SearchIcon} from "ndla-icons/es/common";

const classes = new BEMHelper('c-search-field');

class SearchField extends React.Component {


    render() {
        const {
            placeholder,
            value,
            onChange,
            onSearch,
            small,
            icon,
            isRequired,
            id
        } = this.props;

        return (
            <form {...classes()} onSubmit={onSearch}>
                <div {...classes('input-wrapper')}>
                    <input
                        title={placeholder}
                        type="search"
                        {...classes('input', { small })}
                        aria-autocomplete="list"
                        autoComplete="off"
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        value={value}
                        onChange={onChange}
                        list={id}
                        required={isRequired}
                    />

                    <div {...classes('filters')}>
                        <ActiveFilters filters={[]} onFilterRemove={() => ({})} />
                    </div>
                    <button
                        tabIndex="-1"
                        {...classes('button')}
                        type="submit"
                        value="Search">
                        {icon}
                    </button>
                </div>
            </form>
        );
    }
}

SearchField.propTypes = {
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    small: PropTypes.bool,
    icon: PropTypes.node,
    isRequired: PropTypes.bool
};

SearchField.defaultProps = {
    isRequired: false,
    icon: <SearchIcon />
};

export default SearchField;