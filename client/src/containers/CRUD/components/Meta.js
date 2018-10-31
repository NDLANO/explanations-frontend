import React from 'react';
import Dropdown from "../../../components/Dropdown";

class Meta extends React.Component {

    render() {
        const {choices, current, labelText, id, buttonText, classes, defaultValue=null} = this.props;
        let dropDownDefault = defaultValue;
        if (!dropDownDefault)
            dropDownDefault = this.props.choices[0];

        if (!current)
            return <button  className="c-button--outline" type="button" onClick={() => this.props.onChange(this.props.id, dropDownDefault.id)}>{buttonText}</button>;


        return (
            <Dropdown items={choices} selected={current} onChange={(e) => this.props.onChange(this.props.id,e.target.value)} id={id} label={labelText} classes={classes} />
        )
    }
}

export default Meta;