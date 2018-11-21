import React from 'react';
import Dropdown from "../../../components/Dropdown";
import {Field} from "redux-form";
import {capitalizeText} from "../../../utilities";

const metaNamePrefix = (name) => `meta_${name}`;

const Meta = ({meta, t, classes, initialValues}) => (
    <div {...classes('form-field')} key={meta.category.id}>
        <label  htmlFor="test">{capitalizeText(meta.category.description.toLowerCase())}</label>
        <Field name={metaNamePrefix(meta.category.name.toLowerCase())}
               component={Dropdown}
               id={meta.category.id}
               t={t}
               selected={initialValues[metaNamePrefix(meta.category.name.toLowerCase())]}
               options={meta.metaList.map(x => ({value: x.id, label: x.name}))}/>
    </div>
)

export default Meta;