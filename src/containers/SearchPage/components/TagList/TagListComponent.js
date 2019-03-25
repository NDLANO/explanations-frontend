import React from "react";
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";

import Tag from "./TagComponent";


const classes = new BEMHelper({
    name: 'tag-list',
    prefix: 'c-',
});

const TagList = ({tags, onDelete}) => (
    <ul {...classes()}>
        {tags.map(x => <Tag {...x} classes={classes} onDelete={onDelete} />)}
    </ul>
);

TagList.propTypes = {
    onDelete: PropTypes.func.isRequired
};

export default TagList;