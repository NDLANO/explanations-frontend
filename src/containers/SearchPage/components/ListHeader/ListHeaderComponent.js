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
import TagList from "../TagList/TagListComponent";
import {metaProps} from "../../../../utilities/commonProps";

const classes = new BEMHelper({
    name: 'list-header',
    prefix: 'c-',
});

const ListHeader = ({resultCount, values, options, onRemoveTag, isSearching, onDelete, t}) => {
    const tags = [];
    values.forEach(value => {
       const meta = options.find(x => x.languageVariation === value);
       if (meta)
           tags.push(meta);
    });

    const resultText = isSearching
        ? (<strong>{t('searchPage.searching')}...</strong>)
        : (<React.Fragment>{t('searchPage.resultCount')}&nbsp;<strong>{resultCount}</strong></React.Fragment>);


    return (
        <div {...classes()}>
            <div {...classes('content')}>
                <span {...classes('text')}>
                    {resultText}
                </span>
                <TagList tags={tags} onDelete={onRemoveTag} />
            </div>
        </div>
    )
};

ListHeader.propTypes = {
    t: PropTypes.func.isRequired,
    onRemoveTag: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
    resultCount: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape(metaProps)).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListHeader;