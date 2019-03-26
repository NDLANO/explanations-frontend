/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

import Tag from "./TagComponent";
import {metaProps} from "../../../../utilities/commonProps";


const classes = new BEMHelper({
    name: 'tag-list',
    prefix: 'c-',
});

const TagList = ({tags, onDelete}) => (
    <ul {...classes()}>
        {tags.map(x => <Tag key={x.id} {...x} classes={classes} onDelete={onDelete} />)}
    </ul>
);

TagList.propTypes = {
    onDelete: PropTypes.func.isRequired,

    tags: PropTypes.arrayOf(PropTypes.shape(metaProps))
};

TagList.defaultProps = {
    tags: []
};

export default TagList;