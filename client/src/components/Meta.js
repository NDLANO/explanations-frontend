import React from 'react';
import Dropdown from "./Dropdown";
import {Field} from "redux-form";
import {capitalizeText} from "../utilities";

const Meta = ({meta, t, classes, initialValues}) => (
    <div {...classes('form-field')} key={meta.category.id}>
        <label  htmlFor="test">{capitalizeText(meta.category.description.toLowerCase())}</label>
        <Field name={`meta_${meta.category.name.toLowerCase()}`}
               component={Dropdown}
               id={meta.category.id}
               t={t}
               selected={initialValues[`meta_${meta.category.name.toLowerCase()}`]}
               options={meta.metaList.map(x => ({value: x.id, label: x.name}))}/>
    </div>
)

export default Meta;