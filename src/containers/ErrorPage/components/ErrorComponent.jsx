/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import { OneColumn, ErrorMessage } from 'ndla-ui';
import StatusComponent from "./StatusComponent";
import PropTypes from 'prop-types';

const ErrorComponent = ({t, statusCode, gif, gifText, title, description, back, goToFrontPage}) => (
    <StatusComponent code={statusCode}>
        <OneColumn cssModifier="clear">
            <ErrorMessage
                messages={{
                    title: t(title),
                    description: t(description),
                    back: t(back),
                    goToFrontPage: t(goToFrontPage)
                }}
                illustration={{
                    url: gif,
                    altText: t(gifText),
                }}
            />
        </OneColumn>
    </StatusComponent>
);

ErrorComponent.propTypes = {
    // Required
    statusCode: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,

    // Optional
    gif: PropTypes.string,
    gifText: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    back: PropTypes.string,
    goToFrontPage: PropTypes.string,

};

ErrorComponent.defaultProps = {
    gifText: 'errorMessage.title',
    gif: '/not-exist.gif',
    title: 'errorMessage.title',
    description: 'notFound.description',
    back: 'errorMessage.back',
    goToFrontPage: 'errorMessage.goToFrontPage',
};

export default ErrorComponent;