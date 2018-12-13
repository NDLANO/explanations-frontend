/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import  React from 'react';
import {OneColumn} from "ndla-ui";
import BEMHelper from "react-bem-helper";
import {injectT} from "ndla-i18n";
import PropTypes from 'prop-types';

import './style.css'

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

Loading.defaultProps = {
    message: 'loadingMessage.default'
};

Loading.propTypes = {
    // Optional
    message: PropTypes.string
};

export default injectT(Loading);