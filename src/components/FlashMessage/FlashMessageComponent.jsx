/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
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

        const {message, title, severity, dismissText, t} = this.props;
        return (
            <div {...classes('', severity)}>
                <OneColumn {...classes('content')}>
                    {title && <h1 className="o-heading">{t(title)}</h1>}
                    {Boolean(message.length) && t(message)}
                    <Button {...classes('dismiss')} link={true} onClick={this.dismiss}>{t(dismissText)}</Button>
                </OneColumn>
            </div>
        )
    }
}

FlashMessageComponent.propTypes = {
    t: PropTypes.func.isRequired,

    ...flashMessageShape
};

FlashMessageComponent.defaultProps = {
    title: '',
    message: '',
    dismissText: 'flashMessage.dismiss',
    severity: SEVERITY.info,
};


const hasTitle = ({title}) => !!title ;
export default WithEither(hasTitle, () => null)(FlashMessageComponent);