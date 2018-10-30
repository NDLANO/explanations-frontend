import React from "react";
import BEMHelper from "react-bem-helper";

import './DropDown.style.css'

const classes = new BEMHelper({
    name: 'dropdown',
    prefix: 'c-',
});

const DropDown = ({items, selected, onChange, id, label}) => (
    <div {...classes()}>
        <label htmlFor={id}>{label}</label>
        <select value={selected.id} onChange={onChange}>
            {items.map(item => <
                option key={item.id} value={item.id}>
                {item.name}
            </option>)}
        </select>
    </div>

);

export default DropDown;