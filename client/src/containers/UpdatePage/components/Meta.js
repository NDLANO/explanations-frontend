import React from 'react';
import DropDown from "./DropDown";

class Meta extends React.Component {

    render() {
        const {choices, current, labelText, id, buttonText, classes} = this.props;
        if (!current)
            return <button  className="c-button--outline" type="button" onClick={() => this.props.onChange(this.props.id, this.props.choices[0])}>{buttonText}</button>;


        return (
            <DropDown items={choices} selected={current} onChange={(e) => this.props.onChange(this.props.id,e.target.value)} id={id} label={labelText} classes={classes} />
        )
    }
}

export default Meta;