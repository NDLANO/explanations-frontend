/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

const PreviewImage = ({previewUrl, altText}) => (
    <figure>
        <img src={previewUrl} alt={altText} />
    </figure>
);

PreviewImage.propTypes = {
    previewUrl: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
};

export default PreviewImage;