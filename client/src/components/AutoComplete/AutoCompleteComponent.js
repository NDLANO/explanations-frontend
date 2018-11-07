import React from 'react';
import Autocomplete from "react-autocomplete";
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import './style.css'

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

const AutoCompleteMenu = (items, value) =>
    <div {...classes('menu')} children={items}/>;

class AutoComplete extends React.Component {
    render() {
        const {
            onSelect,
            onChange,
            value,
            items,
            renderItem = AutoCompleteItem,
            renderMenu = AutoCompleteMenu,
            getItemValue = item => item,
            shouldItemRender = (item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1
        } = this.props;
        return (
            <div {...classes()}>
                <Autocomplete
                    items={items}
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
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    items: PropTypes.array.isRequired,

    // Optional
    renderItem: PropTypes.func,
    renderMenu: PropTypes.func,
    getItemValue: PropTypes.func,
    shouldItemRender: PropTypes.func
};

export default AutoComplete;