/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react";
import PropTypes from "prop-types";
import {Content, PageContainer} from "@ndla/ui";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {connect} from "react-redux";
import {injectT} from "@ndla/i18n";
import ErrorBoundary from "../ErrorBoundary";
import Footer from '../../components/Footer';
import Routes from '../Routes';

import Header from "../App/AppContainer";
import {withRouter} from "react-router";

const AppPageContainer = ({t, username, isAuthenticated}) => (
    <PageContainer>
        <Helmet title={t('pageTitles.default')} />
        <Content>
            <Header t={t} username={username} isLoggedIn={isAuthenticated} />
            <ErrorBoundary>
                <Routes />
                <Footer t={t} />
            </ErrorBoundary>
        </Content>
    </PageContainer>
);


AppPageContainer.propTypes = {
    // Required
    t: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,

    // Optional
    username: PropTypes.string,
};

AppPageContainer.defaultProps = {
    username: 'PropTypes.string',
};

const mapStateToProps = state => ({
    username: state.credentials.username,
    isAuthenticated: state.credentials.isAuthenticated,
});
export default compose(
    withRouter,
    connect(mapStateToProps),
    injectT,
)(AppPageContainer);