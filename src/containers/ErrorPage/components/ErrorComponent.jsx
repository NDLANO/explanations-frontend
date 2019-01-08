/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import PropTypes from "prop-types";
import { OneColumn, ErrorMessage } from 'ndla-ui';
import StatusComponent from "./StatusComponent";

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
    t: PropTypes.func.isRequired,
    statusCode: PropTypes.number.isRequired,

    // Optional
    gif: PropTypes.string,
    back: PropTypes.string,
    title: PropTypes.string,
    gifText: PropTypes.string,
    description: PropTypes.string,
    goToFrontPage: PropTypes.string,

};

ErrorComponent.defaultProps = {
    gif: '/not-exist.gif',
    back: 'errorMessage.back',
    title: 'errorMessage.title',
    gifText: 'errorMessage.title',
    description: 'notFound.description',
    goToFrontPage: 'errorMessage.goToFrontPage',
};

export default ErrorComponent;