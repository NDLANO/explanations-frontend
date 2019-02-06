import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {Field} from "redux-form";

import MediaListItem from "./MediaListItemComponent";


const classes = new BEMHelper({
    name: 'media-list',
    prefix: 'c-',
});

const MediaList = ({fields, deleteMedia, isReadOnly, disabled, t}) => (
    <ul {...classes()}>
        {fields.map((mediaName, index) =>
            <Field
                key={index}
                name={mediaName}
                classes={classes}
                isReadOnly={isReadOnly}
                disabled={disabled}
                itemIndex={index}
                t={t}
                deleteMedia={deleteMedia}
                media={fields.get(index)}
                component={MediaListItem} />
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