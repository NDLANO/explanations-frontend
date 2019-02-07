/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';

const PreviewVideo = ({title, previewUrl, width, height}) =>
    <iframe
        width={width}
        height={height}
        title={title}
        src={previewUrl}
        frameBorder="0"
        allowFullScreen=""> </iframe>;

PreviewVideo.propTypes = {
    previewUrl: PropTypes.string.isRequired,

    // Optional
    title: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};

PreviewVideo.defaultProps = {
    title: "",
    width: 400,
    height: 300
};
export default PreviewVideo;