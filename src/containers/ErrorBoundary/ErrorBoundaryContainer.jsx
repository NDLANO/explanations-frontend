/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error) {
        this.setState({ error });
    }

    render() {
        const { t, children } = this.props;
        const { error } = this.state;
        if (error)
            return (
                <div>
                    <h1>{t('errorMessage.title')}</h1>
                    <div>{error.message}</div>
                </div>
            );
        return children;
    }
}

ErrorBoundary.propTypes = {

    // Optional
    children: PropTypes.node,
};

export default ErrorBoundary;