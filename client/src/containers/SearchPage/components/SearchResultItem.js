import React from 'react';
import BEMHelper from "react-bem-helper";

const classes = new BEMHelper({
    name: 'search-result-list__item',
    prefix: 'c-',
});



const TagList = ({tags}) => <div {...classes('tags')}><ul>{tags.map(({id, abbreviation, description}) => <li key={id}>{description}</li>)}</ul></div>;

const SearchResultItem = ({item}) =>
    <li key={item.id} {...classes()}>
        <article>
            <header {...classes('header')}>
                <h1>
                    <a href={`/update/${item.id}`}>{item.title}</a>
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