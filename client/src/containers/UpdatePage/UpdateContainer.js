/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const SelectLocale = ({location,  location: { pathname, search }, updateLocale }) => {
    console.log(location);
    return (
        null
    );
};


const mapStateToProps = ({locale}) => ({
    locale,
});



export default withRouter(connect(mapStateToProps, {updateLocale})(SelectLocale));