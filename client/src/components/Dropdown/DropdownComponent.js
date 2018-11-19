import React from "react";
import BEMHelper from "react-bem-helper";

import './style.css'
import {sortObjectsByKey} from "../../utilities";
import {FIELDS} from "../Concept/fields";
import {Field} from "redux-form";

const classes = new BEMHelper({
    name: 'dropdown',
    prefix: 'c-',
});

const d = ({items, input,t, onChange, id, label}) => (
    <div {...classes()}>
        {label && <label htmlFor={id}>{t(label)}</label>}
        <select value={input.value.id}>
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

const parse = event => {
    // This is what redux-form will hold:
    return JSON.parse(event.target.value);
}

const Dropdown = ({items, id, t, label}) => {
    // TODO
   return  <div {...classes()}>
       {label && <label htmlFor={id}>{t(label)}</label>}
       <Field name="status" component="select"  onChange={input => event => parse(input.onChange(event))}>
           {items
               .sort(sortObjectsByKey('name'))
               .map(item =>
                   <option key={item.id} value={JSON.stringify(item)}>
                       {item.name}
                   </option>
               )}
       </Field>
   </div>
};


export default Dropdown;