import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {Field} from "redux-form";

import MediaListItem from "./MediaListItemComponent";


const classes = new BEMHelper({
    name: 'media-list',
    prefix: 'c-',
});

const MediaList = ({fields, deleteMedia, disabled}) => (
    <ul {...classes()}>
        {fields.map((mediaName, index) => {
            const media = fields.get(index);
            let preview = () => console.log("preview");
            switch(media.mediaType.id) {
                case 1:
                    preview = () => <img src={media.previewUrl} />;
            }
            return <Field
                key={index}
                name={mediaName}
                classes={classes}
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
    disabled: PropTypes.bool
};

export default MediaList;