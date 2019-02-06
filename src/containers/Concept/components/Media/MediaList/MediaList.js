import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {Field} from "redux-form";

import MediaListItem from "./MediaListItemComponent";
import {mediaSwitch} from "../../../conceptCommon";


const classes = new BEMHelper({
    name: 'media-list',
    prefix: 'c-',
});

const MediaList = ({fields, deleteMedia, isReadOnly, disabled}) => (
    <ul {...classes()}>
        {fields.map((mediaName, index) => {
            const media = fields.get(index);
            const preview = mediaSwitch(media.mediaType.title, {
                image: <img src={media.previewUrl} alt={media.altText} />,
                default: null
            });
            return <Field
                key={index}
                name={mediaName}
                classes={classes}
                isReadOnly={isReadOnly}
                disabled={disabled}
                index={index}
                deleteMedia={deleteMedia}
                media={media}
                renderPreview={preview}
                component={MediaListItem} />
            }

        )}
    </ul>
);

MediaList.propTypes = {
    // Required
    fields: PropTypes.object.isRequired,
    deleteMedia: PropTypes.func.isRequired,

    // Optional
    disabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
};

export default MediaList;