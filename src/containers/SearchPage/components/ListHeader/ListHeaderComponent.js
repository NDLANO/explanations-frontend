import React from 'react';
import PropTypes from 'prop-types';
import TagList from "../TagList/TagListComponent";
import {Filter} from '@ndla/icons/editor';
import BEMHelper from "react-bem-helper";
import Cross from "@ndla/icons/es/action/Cross";
import {metaProps} from "../../../../utilities/commonShapes";
import {indexRoute} from "../../../../utilities/routeHelper";
import {Breadcrumb} from "@ndla/ui";

const classes = new BEMHelper({
    name: 'list-header',
    prefix: 'c-',
});

const ListHeader = ({resultCount, values, options, onRemoveTag, isSearching, onDelete,onFilterClick, t,sidebarOpen}) => {
    const tags = [];
    values.forEach(value => {
       const meta = options.find(x => x.languageVariation === value);
       if (meta)
           tags.push(meta);
    });
    const breadCrumbs = [
        {to: indexRoute(), name: t('indexPage.title')},
        {to: indexRoute(), name: t('searchPage.title')},
    ];

    const resultText = isSearching
        ? (<strong>{t('searchPage.searching')}...</strong>)
        : (<React.Fragment>{t('searchPage.resultCount')}&nbsp;<strong>{resultCount}</strong></React.Fragment>);


    return (
        <div {...classes()}>
            <div>
                {sidebarOpen ?  <Filter onClick={onFilterClick} /> :  <Cross onClick={onFilterClick} />}
                <Breadcrumb items={breadCrumbs}/>
            </div>
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
    onFilterClick: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
    resultCount: PropTypes.number.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(metaProps).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListHeader;