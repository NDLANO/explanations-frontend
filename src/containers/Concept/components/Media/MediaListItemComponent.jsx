import React from 'react';
import PropTypes from 'prop-types';
import Button from "@ndla/button";

const MediaListItem = ({classes, media: {name, mediaType}}) =>
    <div {...classes}>
        <label>{mediaType.name}</label>
        <div>
            <span>{name}</span>
            <Button outline onClick={() => console.log("ja")}>Preview</Button>
        </div>
    </div>;

MediaListItem.propTypes = {
    media: PropTypes.shape({
        mediaType: PropTypes.shape({
            name: PropTypes.string.isRequired
        }),
        name: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.func.isRequired,
};

export default MediaListItem;