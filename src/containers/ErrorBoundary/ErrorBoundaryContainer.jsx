/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {injectT} from "@ndla/i18n";
import OpsSomethingHappenedPage from "../ErrorPage/OpsSomethingHappenedPage";


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    render() {
        return this.state.error
            ? <OpsSomethingHappenedPage t={this.props.t} message={this.state.error.message} />
            : this.props.children;
    }
}

ErrorBoundary.propTypes = {
    // Optional
    children: PropTypes.node,
};

export default injectT(ErrorBoundary);