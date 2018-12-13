import React from "react";
import ApiService from "../../services/apiService";

const withApiService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken, history} = this.props;
            const {EXTERNAL_URL: {concept_API: apiUrl = ''}} = window.config;
            const apiService = new ApiService({accessToken, history, apiUrl});

            return (
                <WrappedComponent
                    {...this.props}
                    apiService={apiService}
                />
            );
        }
    }
    return HOC;
};

export default withApiService;