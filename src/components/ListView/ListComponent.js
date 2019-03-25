/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import Pager from '@ndla/pager';
import BEMHelper from "react-bem-helper";
import {array, func, number, object} from 'prop-types';

import ListItemComponent from "./ListItem";

const classes = new BEMHelper({
    name: 'listview',
    prefix: 'c-',
});

const ListView = ({items, ListItemComponent, query, page, lastPage, onPagerClick}) => (
    <div {...classes()}>
        <ul {...classes('list')}>
            {items.map(item => <ListItemComponent key={item.id} {...item} />)}
        </ul>
        {lastPage > 1 && <Pager
            {...classes('pagination')}
            page={page}
            lastPage={lastPage}
            query={query}
            onClick={onPagerClick}
        />}
    </div>
);

ListView.propTypes = {
    // Required
    onPagerClick: func.isRequired,

    // Optional
    page: number,
    items: array,
    query: object,
    lastPage: number,
    ListItemComponent: func,
};

ListView.defaultProps = {
    items: [],
    lastPage: 0,
    ListItemComponent: ListItemComponent,
};

export default ListView;