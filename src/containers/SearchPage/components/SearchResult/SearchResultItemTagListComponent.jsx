/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({tags, classes, labelKey}) =>
    <ul {...classes('tags')}>
        {tags.map((item) => <li key={item.id}>{item[labelKey]}</li>)}
    </ul>;

TagList.propTypes = {
    // Required
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    classes: PropTypes.func.isRequired,

    // Optional
    labelKey: PropTypes.string
};

TagList.defaultProps = {
    labelKey: 'description'
};

export default TagList;