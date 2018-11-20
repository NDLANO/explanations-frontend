import React from "react";
import BEMHelper from "react-bem-helper";

import './style.css'
import {sortObjectsByKey} from "../../../../utilities";

const classes = new BEMHelper({
    name: 'searchDropdown',
    prefix: 'c-',
});

const SearchDropdown  = ({items, selected, onChange, id, label}) => (
    <div {...classes()}>
        {label && <label htmlFor={id}>{label}</label>}
        <select value={selected.id} onChange={onChange}>
            {items
                .sort(sortObjectsByKey('name'))
                .map(item =>
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                )}
        </select>
    </div>

);

export default SearchDropdown;