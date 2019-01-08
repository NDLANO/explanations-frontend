/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import  React from 'react';
import PropTypes from "prop-types";
import BEMHelper from "react-bem-helper";
import {OneColumn} from "ndla-ui";
import {injectT} from "ndla-i18n";

import './style.scss'

const classes = new BEMHelper({
    name: 'loading',
    prefix: 'c-',
});

const Loading = ({t, message}) =>
    <OneColumn {...classes()}>
        <div {...classes('content')}>
            <h6>{t(message)}</h6>
        </div>
    </OneColumn>;


Loading.propTypes = {
    // Required
    t: PropTypes.func.isRequired,

    // Optional
    message: PropTypes.string
};

Loading.defaultProps = {
    message: 'loadingMessage.default'
};

export default injectT(Loading);