/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import BEMHelper from "react-bem-helper";
import React from 'react';
import PropTypes from 'prop-types';
import {listItemShape} from "./ListItemShape";
import {trimTextToX} from "../utilities";
import {createRoute, editConceptRoute} from "../../../utilities/routeHelper";
import MetaList from "../../MetaList";
import {matchShape} from "../../../utilities/commonShapes";

const classes = new BEMHelper({
    name: 'listview-item',
    prefix: 'c-',
});

class ListItemComponent extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {showImage: true};
        this.imageDoesNotExist = this.imageDoesNotExist.bind(this);
    }

    imageDoesNotExist() {
        this.setState({showImage: false});
    }

    render() {
        const {title, previewImage, imageText, id, content, meta, maxDescriptionLength, author, match} = this.props;


        return (
            <div {...classes()}>
                <div {...classes('content')}>
                    <div {...classes('top')}>
                        <h1 {...classes('title')}>
                            <a href={createRoute(match, editConceptRoute(id))} target="_blank" rel="noopener noreferrer">
                                {title}
                            </a>
                        </h1>
                        <div {...classes('author')}>
                            {author}
                        </div>
                        <div  {...classes('description')}>
                            {trimTextToX(content, maxDescriptionLength)}
                        </div>

                    </div>
                    <div {...classes('bottom')}>
                        <MetaList meta={meta} />
                    </div>

                </div>
                {previewImage && this.state.showImage && <img onError={this.imageDoesNotExist} src={previewImage} alt={imageText} />}
            </div>
        );
    }
}

ListItemComponent.propTypes = {
    ...listItemShape,
    match: PropTypes.shape(matchShape)
};

ListItemComponent.defaultProps = {
    maxDescriptionLength: 200,
    meta: [],
    image: '',
    imageText: ''
};

export default ListItemComponent;