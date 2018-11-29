/**
 * Copyright (C) 2018 -present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {compose} from "redux";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {indexRoute} from "../../utilities/routeHelper";

import {logoutSuccess} from "./logoutActions";

class LogoutContainer extends React.PureComponent {
    componentDidMount() {
        this.props.logoutSuccess();
        this.props.history.push(indexRoute())
    }

    render() {
        return (<div/>)
    }
}

LogoutContainer.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    logoutSuccess: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    connect(null, {logoutSuccess})
)(LogoutContainer);
