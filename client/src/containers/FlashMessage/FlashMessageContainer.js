import React from 'react';
import {connect} from "react-redux";
import BEMHelper from "react-bem-helper";
import PropTypes from 'prop-types';
import {OneColumn} from "ndla-ui";
import {compose} from "redux";

import WithEither from "../../components/HOC/WithEither";

import './style.css'

export const SEVERITY = {
    info: 'info',
    warning: 'warning',
    success: 'success',
    error: 'error'
};

const classes = new BEMHelper({
    name: 'flashmessage',
    prefix: 'c-',
});


const FlashMessageContainer = ({message, title, severity}) =>
    <div {...classes('', severity)}>
        <OneColumn {...classes('content')}>
            {title && <h1 className="o-heading">{title}</h1>}
            {message}
        </OneColumn>
    </div>;

FlashMessageContainer.propTypes = {
    message: PropTypes.string,
    title: PropTypes.string,
    severity: PropTypes.string,
};

FlashMessageContainer.defaultProps = {
    message: '',
    severity: SEVERITY.info,
};

const mapStateToProps = ({flashMessage: {message, severity}}) => ({message: "Test", severity: SEVERITY.success, title: "Hei!"});

const hasMessage = ({message}) => !!message;
export default compose(
    connect(mapStateToProps),
    WithEither(hasMessage, () => null),
)(FlashMessageContainer);