/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import BEMHelper from "react-bem-helper";
import {OneColumn, Button} from "ndla-ui";

import WithEither from "../../components/HOC/WithEither";

import './style.scss'
import {flashMessageShape} from "./FlashMessageShape";

export const SEVERITY = {
    info: 'info',
    warning: 'warning',
    success: 'success',
    error: 'error'
};

const classes = new BEMHelper({
    name: 'flashmessage',
    prefix: 'c-',
});

class FlashMessageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isClosed: false};
        this.dismiss = this.dismiss.bind(this);
    }

    dismiss() {
        this.setState({isClosed: true});
    }

    render() {
        if (this.state.isClosed)
            return null;

        const {message, title, severity, dismissText} = this.props;
        return (
            <div {...classes('', severity)}>
                <OneColumn {...classes('content')}>
                    {title && <h1 className="o-heading">{title}</h1>}
                    {message}
                    <Button {...classes('dismiss')} link={true} onClick={this.dismiss}>{dismissText}</Button>
                </OneColumn>
            </div>
        )
    }
}

FlashMessageComponent.propTypes = {...flashMessageShape};

FlashMessageComponent.defaultProps = {
    title: '',
    message: '',
    severity: SEVERITY.info,
};


const hasMessage = ({message, title}) => message || title ;
export default WithEither(hasMessage, () => null)(FlashMessageComponent);