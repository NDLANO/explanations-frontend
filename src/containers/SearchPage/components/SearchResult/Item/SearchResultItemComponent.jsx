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

import TagList from "../SearchResultItemTagListComponent";

import {updateRoute} from "../../../../../utilities/routeHelper";
import {sortWordsIgnoreCase} from "../../../../../utilities/sorting";

const classes = new BEMHelper({
    name: 'search-result-item',
    prefix: 'c-',
});

const MetaTags = ({classes, languages, subjects, licence, meta}) =>
    <React.Fragment>
        <TagList tags={subjects.sort(sortWordsIgnoreCase)} classes={classes} />
        <TagList tags={languages.sort(sortWordsIgnoreCase)} classes={classes} />
        <TagList tags={licence.sort(sortWordsIgnoreCase)} classes={classes} />
        <TagList tags={meta.sort(sortWordsIgnoreCase)} classes={classes} />
    </React.Fragment>;

MetaTags.propTypes = {
    // Required
    languages: PropTypes.array.isRequired,
    subjects: PropTypes.array.isRequired,
    licence: PropTypes.object.isRequired,

    // Optional
    classes: PropTypes.array,
    meta: PropTypes.array
};

MetaTags.propTypes = {
    meta: []
};

const filterMeta = metas => {
    let languages = [];
    let subjects = [];
    let licence = [];
    let meta = [];

    metas.forEach(item => {
        switch(item.category.name.toLowerCase()){
            case 'language':
                languages.push(item);
                break;
            case 'subject':
                subjects.push(item);
                break;
            case 'licence':
                licence.push(item);
                break;
            default:
                meta.push(item);
        }
    });

    return {
        languages,
        subjects,
        licence,
        meta
    }
};

const SearchResultItem = ({id, title, sourceAuthor, content, meta}) => {
    const filteredMetas = filterMeta(meta);
    return (
        <li key={id} {...classes()}>
            <article>
                <header {...classes('header')}>
                    <h1>
                        <Link to={updateRoute(id)}>{title}</Link>
                    </h1>
                </header>

                <div {...classes('sourceAuthor')}>
                    {sourceAuthor}
                </div>

                <div {...classes('content')}>
                    {Boolean(content) && content.slice(0, 220)}...
                </div>

            </article>
        </li>
    )
};

SearchResultItem.propTypes = {
    meta: PropTypes.array
};
SearchResultItem.defaultProps = {
    meta: []
};

export default SearchResultItem;