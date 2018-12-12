/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import BEMHelper from "react-bem-helper";
import {Link} from "react-router-dom";

import TagList from "../SearchResultItemTagListComponent";

import {updateRoute} from "../../../../../utilities/routeHelper";

const classes = new BEMHelper({
    name: 'search-result-item',
    prefix: 'c-',
});


const SearchResultItem = ({item}) =>
    <li key={item.id} {...classes()}>
        <article>
            <header {...classes('header')}>
                <h1>
                    <Link to={updateRoute(item.id)}>{item.title}</Link>
                </h1>
            </header>

            <div {...classes('author')}>
                {item.author}
            </div>

            <div {...classes('content')}>
                {Boolean(item.content) && item.content.slice(0, 220)}...
            </div>

            {Boolean(item.meta.length) && <TagList tags={item.meta} classes={classes} />}
        </article>
    </li>;


export default SearchResultItem;