/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

import PropTypes from "prop-types";
const SectionComponent = ({title, className}) =>
    <div className={className}>
        <hr />
        <h2>{title}</h2>
        <hr />
    </div>;

SectionComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SectionComponent;