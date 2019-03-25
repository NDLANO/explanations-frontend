/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import BEMHelper from "react-bem-helper";

const classes = new BEMHelper({
    name: 'divider',
    prefix: 'c-',
});

const Divider = props => <div {...classes()} {...props} ><div {...classes('content')} /></div>;
export default Divider;