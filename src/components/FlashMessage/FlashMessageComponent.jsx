/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';
import {OneColumn} from "ndla-ui";

import WithEither from "../../components/HOC/WithEither";

import './style.css'

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


const FlashMessageComponent = ({message, title, severity}) =>
    <div {...classes('', severity)}>
        <OneColumn {...classes('content')}>
            {title && <h1 className="o-heading">{title}</h1>}
            {message}
        </OneColumn>
    </div>;

FlashMessageComponent.propTypes = {
    message: PropTypes.string,
    title: PropTypes.string,
    severity: PropTypes.string,
};

FlashMessageComponent.defaultProps = {
    message: '',
    title: '',
    severity: SEVERITY.info,
};


const hasMessage = ({message, title}) => message || title ;
export default WithEither(hasMessage, () => null)(FlashMessageComponent);