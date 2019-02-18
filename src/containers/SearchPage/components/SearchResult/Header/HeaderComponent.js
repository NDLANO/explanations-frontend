import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from "prop-types";


const classes = new BEMHelper({
    name: 'search-result-header',
    prefix: 'c-',
});

class HeaderComponent extends React.Component {

    render() {
        const {results, userHasSearched, t, searchQuery} = this.props;
        if (!userHasSearched)
            return null;


        if (results.length === 0) {
            return (
                <div {...classes}>
                    {t('Fant ingen begreper med meta som ....')}
                </div>
            )
        } else {
            console.log("query", searchQuery)
            console.log("res", results.filter(x => x.meta).filter(x => x.meta.find(y => y.id === searchQuery.language.value)))

           /* const conceptsWithSubejctExists = results.find(x => x.meta && x.meta.find(m => m.id === searchQueryValues.subject.id));
            const conceptsWithLanguageExists = results.find(x => x.meta && x.meta.find(m => m.id === searchQueryValues.language.id));

            console.log("meta", conceptsWithLanguageExists, conceptsWithSubejctExists)*/
            return (
                <div>
                    Du søkte på ...
                </div>
            )
        }

    }
}

HeaderComponent.propTypes = {
    searchQuery: PropTypes.object.isRequired,

    results: PropTypes.array,
    userHasSearched: PropTypes.bool
};

HeaderComponent.defaultProps = {
    results: [],
    userHasSearched: false
};

export default HeaderComponent;

