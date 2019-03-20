/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import Autocomplete from "react-autocomplete";
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

const classes = new BEMHelper({
    name: 'autocomplete',
    prefix: 'c-',
});

const AutoCompleteItem = (item, highlighted) =>
    <div key={item}
        {...classes("item", highlighted ? 'active' : '')}
    >
        {item}
    </div>;

const AutoCompleteMenu = (items, value) => <div {...classes('menu')} children={items}/>;

class AutoComplete extends React.Component {
    render() {
        const {
            onSelect,
            onChange,
            value,
            items,
            placeholder,
            renderItem,
            renderMenu,
            getItemValue,
            shouldItemRender,
            displayMaxResults
        } = this.props;

        let itemsList = items;
        if (displayMaxResults) {
            itemsList = items.slice(0, displayMaxResults);
        }

        return (
            <div {...classes()}>
                <Autocomplete
                    inputProps={{placeholder}}
                    items={itemsList}
                    shouldItemRender={shouldItemRender}
                    getItemValue={getItemValue}
                    renderItem={renderItem}
                    renderMenu={renderMenu}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onSelect={onSelect}
                    {...classes}
                />
            </div>
        );
    }
}

AutoComplete.propTypes = {
    // Required
    value: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,

    // Optional
    renderItem: PropTypes.func,
    renderMenu: PropTypes.func,
    getItemValue: PropTypes.func,
    placeholder: PropTypes.string,
    shouldItemRender: PropTypes.func,
    displayMaxResults: PropTypes.number
};


AutoComplete.defaultProps = {
    // Optional
    placeholder: '',
    displayMaxResults: null,
    getItemValue: item => item,
    renderItem: AutoCompleteItem,
    renderMenu: AutoCompleteMenu,
    shouldItemRender: (item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1,
};

export default AutoComplete;