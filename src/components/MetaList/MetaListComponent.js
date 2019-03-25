/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {metaProps} from "../../utilities/commonShapes";

const classes = new BEMHelper({
    name: 'meta-list',
    prefix: 'c-',
});

const MetaListComponent = ({meta}) =>
    <ul {...classes()}>
        {_.sortBy(meta, 'category.name').map((item) => <li key={item.id}>{item.category.typeGroup.name.toLowerCase() !== "language" ? (item.abbreviation || item.name) : item.name}</li>)}
    </ul>;

MetaListComponent.propTypes = {
    // Required
    meta: PropTypes.arrayOf(PropTypes.shape(metaProps)).isRequired,

    // Optional
    labelKey: PropTypes.string,
};

MetaListComponent.defaultProps = {
    labelKey: 'description',
};

export default MetaListComponent;