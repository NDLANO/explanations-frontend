/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({tags, classes}) =>
    <ul {...classes('tags')}>
        {tags.map(({id, description}) => <li key={id}>{description}</li>)}
    </ul>;

TagList.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    classes: PropTypes.func.isRequired
};

export default TagList;