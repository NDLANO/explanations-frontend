import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from "prop-types";

const classes = new BEMHelper({
    name: 'search-result-header',
    prefix: 'c-',
});

class HeaderComponent extends React.Component {

    renderNotFound(condition, searchValue, text='searchPage.notResultsWith') {
        if (condition)
            return null;

        return (
            <div>
                {this.props.t(text)} <strong>{searchValue}</strong>
            </div>
        )
    }

    render() {
        const {results, userHasSearched, t, searchQuery, searchResultMeta: {totalItems}} = this.props;
        if (!userHasSearched)
            return null;

        const resultsContainsLanguageMeta = results.filter(x => x.meta.find(y => y.id === searchQuery.language.value));
        const resultsContainsSubjectMeta = results.filter(x => x.meta.find(y => y.id === searchQuery.subject.value));
        const resultsWithTitle = results.filter(x => x.title === searchQuery.title);

        return (
            <div {...classes()}>
                <strong>
                    {userHasSearched ? `${totalItems} ${t('searchPage.resultHits')}` : ''}
                </strong>
                <React.Fragment>
                    {searchQuery.term && this.renderNotFound(resultsWithTitle.length, searchQuery.term, 'searchPage.resultsFor')}
                    {searchQuery.language.value !== -1 && this.renderNotFound(resultsContainsLanguageMeta.length, searchQuery.language.label)}
                    {searchQuery.subject.value !== -1 && this.renderNotFound(resultsContainsSubjectMeta.length, searchQuery.subject.label)}
                </React.Fragment>
            </div>
        )
    }
}

HeaderComponent.propTypes = {
    // Required
    searchQuery: PropTypes.object.isRequired,

    // Optional
    results: PropTypes.array,
    userHasSearched: PropTypes.bool,
    searchResultMeta: PropTypes.object,
};

HeaderComponent.defaultProps = {
    results: [],
    userHasSearched: false
};

export default HeaderComponent;

