import React from "react";

const DropDown = ({items, selected, onChange, id, classes, label}) => (
    <div {...classes}>
        <label htmlFor={id}>{label}</label>
        <select value={selected.id} onChange={onChange}>
            {items.map(item => <
                option key={item.id} value={item.id}>
                {item.description}
            </option>)}
        </select>
    </div>

);

export default DropDown;