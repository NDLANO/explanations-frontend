import React from "react";
import AuthenticationService from "../../services/authenticationService";

const withApiService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken} = this.props;
            const authenticationService = new AuthenticationService({accessToken});

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

export default withApiService;