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
import PropTypes from "prop-types";

import ListItemComponent from "./ListItem";
import {matchProps} from "../../utilities/commonShapes";

const classes = new BEMHelper({
    name: 'listview',
    prefix: 'c-',
});

const ListView = ({items, ListItemComponent, query, page, match, lastPage, onPagerClick}) => (
    <div {...classes()}>
        <ul {...classes('list')}>
            {items.map(item => <ListItemComponent key={item.id} {...item} match={match} />)}
        </ul>
        {lastPage > 1 && <Pager
            {...classes('pagination')}
            page={page}
            lastPage={lastPage}
            query={query}
            pathname=""
            onClick={onPagerClick}
        />}
    </div>
);

ListView.propTypes = {
    // Required
    onPagerClick: PropTypes.func.isRequired,

    // Optional
    page: PropTypes.number,
    items: PropTypes.array,
    query: PropTypes.object,
    lastPage: PropTypes.number,
    ListItemComponent: PropTypes.func,
    match: PropTypes.shape(matchProps).isRequired,
};

ListView.defaultProps = {
    items: [],
    lastPage: 0,
    ListItemComponent: ListItemComponent,
};

export default ListView;