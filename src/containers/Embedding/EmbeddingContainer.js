import React from 'react';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {injectT} from "@ndla/i18n";
import 'url-search-params-polyfill';

import {loginSuccess} from "../Login";
import withAuthenticationService from "../../components/HOC/withAuthenticationService";
import AuthenticationService from "../../services/authenticationService";
import {indexRoute} from "../../utilities/routeHelper";
import {historyShape} from "../../utilities/commonShapes";
import Loading from "../../components/Loading";
import {updateInitialFormValues} from "../SearchPage/searchPageActions";
import withApiService from "../../components/HOC/withApiService";
import ApiService from "../../services/apiService";


class EmbeddingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "embeddingPage.loading"
        };
    }

    componentDidMount() {
        const {authenticationService,
            loginSuccess,
            history,
            updateInitialFormValues,
            apiService} = this.props;
        const searchParam = new URLSearchParams(history.location.search);
        const accessToken = searchParam.get('accessToken');

        const promises = [
            apiService.getById(searchParam.get('language'), apiService.endpoints.meta),
            apiService.getById(searchParam.get('subject'), apiService.endpoints.meta)
        ];

        Promise.all(promises)
            .then(([languageResult, subjectResult]) => {

                const initialFormValues = {term: searchParam.get('term')};
                initialFormValues['subject'] = subjectResult;
                initialFormValues['language'] = languageResult;

                updateInitialFormValues(initialFormValues);
            })
            .catch()
            .finally(x => {
                const credentials = authenticationService.createCredentials(accessToken);
                if (credentials) {
                    loginSuccess(credentials);
                    history.replace(indexRoute());
                }else
                    this.setState({message: 'embeddingPage.notVerifiedToken'});
                }
            );

    }

    render() {
        return <Loading t={this.props.t} message={this.state.message} />;
    }
}

EmbeddingContainer.propTypes = {
    history: historyShape.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    updateInitialFormValues: PropTypes.func.isRequired,
    apiService: PropTypes.instanceOf(ApiService),
    authenticationService: PropTypes.instanceOf(AuthenticationService),
};


export default compose(
    connect(null, {loginSuccess, updateInitialFormValues}),
    withAuthenticationService,
    withApiService,
    injectT,
    withRouter
)(EmbeddingContainer);