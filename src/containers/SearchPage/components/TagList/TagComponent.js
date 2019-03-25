/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import PropTypes from 'prop-types';
import { Cross } from '@ndla/icons/action';
import {conceptProps} from "../../../../utilities/commonProps";

const Tag = ({title, category, classes, languageVariation, onDelete}) => (
    <li {...classes('item')}>
        <span>{`${category.name}: ${title}`}</span>
        <Cross onClick={onDelete.bind(null, languageVariation)} />
    </li>
);

Tag.propTypes = {
    ...PropTypes.shape(conceptProps),
    onDelete: PropTypes.func.isRequired
};


export default Tag;