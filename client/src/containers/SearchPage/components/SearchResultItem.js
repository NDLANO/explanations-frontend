import React from 'react';
import BEMHelper from "react-bem-helper";

const TagList = ({tags}) => <ul>{tags.map(tag => <li>{tag.description ? tag.description : tag.code}</li>)}</ul>;

const searchResultItemClasses = BEMHelper('c-search-result-item');

const SearchResultItem = ({item}) =>
    <li key={item.id} {...searchResultItemClasses()}>
        <article>
            <header {...searchResultItemClasses('header')}>
                <h1>
                    <a href={`/test`}>{item.title}</a>
                </h1>
            </header>

            <div {...searchResultItemClasses('author')}>
                {item.author}
            </div>

            <div {...searchResultItemClasses('content')}>
                {item.content.slice(0, 220)}...
            </div>

            {Boolean(item.metadata.length) && <TagList tags={item.metadata} />}
        </article>
    </li>;


export default SearchResultItem;