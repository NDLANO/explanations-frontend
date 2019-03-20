/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from "react-bem-helper";
import {Link} from "react-router-dom";

import MetaList from "./components/SearchResultItemMetaListComponent";

import {updateRoute} from "../../../../../utilities/routeHelper";
import {sortObjectsByKey} from "../../../../../utilities/sorting";
import {limitTextToLength} from "../../../../../utilities";

const classes = new BEMHelper({
    name: 'search-result-item',
    prefix: 'c-',
});

const sortWordsIgnoreCase = sortObjectsByKey('name');

const filterMeta = (metas, t) => {
    let languages = [];
    let subjects = [];
    let meta = [];

    metas.forEach(item => {
        switch(item.category.typeGroup.name.toLowerCase()){
            case "language":
                languages.push(item);
                break;
            case "subject":
                subjects.push(item);
                break;
            default:
                meta.push(item);
        }
    });

    return {
        languages,
        subjects,
        meta
    }
};

const SearchResultItem = ({id, title, sourceAuthor, content, meta, t}) => {

    const filteredMetas = filterMeta(meta, t);
    return (
        <li key={id} {...classes()}>
                <header {...classes('header')}>
                    <h1>
                        <Link to={updateRoute(id)}>{title}</Link>
                    </h1>
                </header>

                <div {...classes('author')}>
                    {sourceAuthor}
                </div>

                <div {...classes('content')}>
                    {Boolean(content) && limitTextToLength(content, 220)}
                </div>

                <MetaList tags={filteredMetas.subjects.sort(sortWordsIgnoreCase)} classes={classes('meta-list')} />
                <MetaList tags={filteredMetas.languages.sort(sortWordsIgnoreCase)} classes={classes('meta-list')} />
                <MetaList tags={filteredMetas.meta.sort(sortWordsIgnoreCase)} classes={classes('meta-list', 'meta')} />
        </li>
    )
};

SearchResultItem.propTypes = {
    id: PropTypes.number.isRequired,
    meta: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    sourceAuthor: PropTypes.string.isRequired,
};
SearchResultItem.defaultProps = {
    meta: []
};

export default SearchResultItem;