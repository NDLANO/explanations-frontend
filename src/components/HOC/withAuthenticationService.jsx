import React from "react";
import AuthenticationService from "../../services/authenticationService";

const withAuthenticationService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken} = this.props;
            const {config: {AUTH0 = {}} = {AUTH0: {}}} = window;
            const authenticationService = new AuthenticationService({accessToken, authProviderConfig: AUTH0});

            return (
                <WrappedComponent
                    {...this.props}
                    authenticationService={authenticationService}
                />
            );
        }
    }
    return HOC;
};

export default withAuthenticationService;