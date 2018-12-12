import React from "react";
import AuthenticationService from "../../services/authenticationService";

const withAuthenticationService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken} = this.props;
            const authenticationService = new AuthenticationService({accessToken, authProviderConfig: window.config.AUTH0});

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