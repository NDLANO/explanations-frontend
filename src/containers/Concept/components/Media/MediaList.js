import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {Field} from "redux-form";

import MediaListItem from "./MediaListItemComponent";


const classes = new BEMHelper({
    name: 'media-list',
    prefix: 'c-',
});

const MediaList = ({fields, deleteMedia, previewMedia, disabled}) => (
    <ul {...classes()}>
        {fields.map((media, index) =>
            <Field
                key={index}
                name={media}
                classes={classes}
                disabled={disabled}
                index={index}
                deleteMedia={deleteMedia}
                previewMedia={previewMedia}
                media={fields.get(index)}
                component={MediaListItem} />
        )}
    </ul>
);

MediaList.propTypes = {
    // Required
    fields: PropTypes.object.isRequired,
    deleteMedia: PropTypes.func.isRequired,
    previewMedia: PropTypes.func.isRequired,

    // Optional
    disabled: PropTypes.bool
};

export default MediaList;