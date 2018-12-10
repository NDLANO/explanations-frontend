import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = state => {
    const {concept: {clone: {initialFormValues, flashMessage}}} = state;
    return {
        ...mapStateToPropsCommon(state),
        initialFormValues,
        flashMessage
    }
};