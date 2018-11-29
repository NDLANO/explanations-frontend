import React from 'react';
import BEMHelper from "react-bem-helper";
import {Link} from "react-router-dom";

import {updateRoute} from "../../../../utilities/routeHelper";

const classes = new BEMHelper({
    name: 'search-result-list__item',
    prefix: 'c-',
});



const TagList = ({tags}) => <div {...classes('tags')}><ul>{tags.map(({id, abbreviation, name}) => <li key={id}>{name}</li>)}</ul></div>;

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

            {Boolean(item.meta.length) && <TagList tags={item.meta} />}
        </article>
    </li>;


export default SearchResultItem;