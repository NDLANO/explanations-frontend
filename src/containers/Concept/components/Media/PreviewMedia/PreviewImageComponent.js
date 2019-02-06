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