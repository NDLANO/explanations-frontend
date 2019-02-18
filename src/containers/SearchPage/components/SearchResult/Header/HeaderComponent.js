import React from 'react';
import BEMHelper from "react-bem-helper";
import PropTypes from "prop-types";


const classes = new BEMHelper({
    name: 'search-result-header',
    prefix: 'c-',
});

class HeaderComponent extends React.Component {

    render() {
        const {results, userHasSearched, t} = this.props;
        if (!userHasSearched)
            return null;

        if (results.length === 0) {
            return (
                <div>
                    Fant ingen begreper med meta som ....
                </div>
            )
        } else {
            return (
                <div>
                    Du søkte på ...
                </div>
            )
        }

    }
}

HeaderComponent.propTypes = {
    results: PropTypes.array,
    userHasSearched: PropTypes.bool
};

HeaderComponent.defaultProps = {
    results: [],
    userHasSearched: false
};

export default HeaderComponent;

