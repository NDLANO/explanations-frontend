/**
 * Copyright (C) 2018-present, NDLA
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from 'prop-types';
import ApiService from "../../services/apiService";
import {config} from '../../config';


const withApiService = WrappedComponent  =>{
    class HOC extends React.Component {
        render () {
            const {accessToken, history} = this.props;
            const apiService = new ApiService({accessToken, history, apiUrl: config.EXTERNAL_URL.concept_API});

            return (
                <WrappedComponent
                    {...this.props}
                    apiService={apiService}
                />
            );
        }
    }

    HOC.propTypes = {
        history: PropTypes.object.isRequired,

        accessToken: PropTypes.string,
    };
    HOC.defaultProps = {
        accessToken: ''
    };

    return HOC;
};

export default withApiService;