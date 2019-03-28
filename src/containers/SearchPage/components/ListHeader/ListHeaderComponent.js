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
import {searchResultProps, searchQueryProps} from "../../SearchPageContainer";
import QueryFeedbackItem from "./QueryFeedbackItem";

const classes = new BEMHelper({
    name: 'list-header',
    prefix: 'c-',
});


class ListHeader extends React.Component {

    getTitleFeedback(){
        const {searchResult, searchQuery, t} = this.props;
        if(searchQuery.title.length > 0 && !searchResult.items.some(x => x.title.indexOf(searchQuery.title) > -1)) {
            return <QueryFeedbackItem id={searchQuery.title} t={t} text={searchQuery.title} />;
        }
        return null;
    }
    getLanguageFeedback(){
        const {searchResult, searchQuery, t, meta} = this.props;
        if(!searchResult.items.some(x => x.meta.some(m => m.abbreviation === searchQuery.language))) {
            const languageMeta = meta.find(x => x.abbreviation === searchQuery.language);
            if (languageMeta) {
                return <QueryFeedbackItem id={languageMeta.id} t={t} text={languageMeta.name} />;
            }
        }
    }
    getMetaFeedback(){
        const {searchResult, searchQuery, t, meta} = this.props;
        const metaFeedback = [];
        searchQuery.meta.forEach(metaLanguageVariation => {
            if (!searchResult.items.some(x => x.meta.some(m => m.languageVariation === metaLanguageVariation))) {
                const m = meta.find(x => x.languageVariation === metaLanguageVariation);
                if (m)
                    metaFeedback.push(<QueryFeedbackItem id={m.id} t={t} text={m.abbreviation || m.name} />);
            }
        });
        return metaFeedback;
    }

    renderText() {
        const {searchResult, t} = this.props;

        let feedback = [];

        const titleFeedback = this.getTitleFeedback();
        if (titleFeedback)
            feedback.push(titleFeedback);

        const languageFeedback = this.getLanguageFeedback();
        if(languageFeedback)
            feedback.push(languageFeedback);

        const metaFeedback = this.getMetaFeedback();
        if(metaFeedback)
            feedback = feedback.concat(metaFeedback);

        return (
            <React.Fragment>
                <span>{t('searchPage.resultCount')}&nbsp;<strong>{searchResult.totalItems}</strong></span>
                <ul {...classes('no-result-list')}>
                    {searchResult.totalItems > 0 && feedback}
                </ul>
            </React.Fragment>
        )
    }

    render() {
        const {values, options, onRemoveTag, isSearching, t} = this.props;

        const tags = [];
        values.forEach(value => {
            const meta = options.find(x => x.languageVariation === value);
            if (meta)
                tags.push(meta);
        });

        return (
            <div {...classes()}>
                <div {...classes('content')}>
                <span {...classes('text')}>
                    {isSearching
                        ? <strong>{t('searchPage.searching')}...</strong>
                        : this.renderText()}
                </span>
                    <TagList tags={tags} onDelete={onRemoveTag} />
                </div>
            </div>
        )
    }
}


ListHeader.propTypes = {
    t: PropTypes.func.isRequired,
    onRemoveTag: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired,
    meta: PropTypes.arrayOf(metaProps).isRequired,
    resultCount: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape(metaProps)).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,

    searchQuery: PropTypes.shape(searchQueryProps).isRequired,
    searchResult: PropTypes.shape(searchResultProps).isRequired
};

export default ListHeader;