import React from 'react';


class Paginator extends React.Component {


    render() {
        const {totalPages = 0} = this.props;

        if (totalPages < 1)
            return null;

        if (totalPages === 1)
            return null;
        return null;
    }
}
export default Paginator;