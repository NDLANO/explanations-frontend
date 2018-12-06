import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = state => {
    const {initialFormValues, flashMessage, deleteButtonIsDisabled} = state.concept.update;
    return {
        ...mapStateToPropsCommon(state),
        isAuthenticated: state.credentials.isAuthenticated,
        userScopes: state.credentials.scopes,
        initialFormValues,
        flashMessage,
        deleteButtonIsDisabled
    }
};