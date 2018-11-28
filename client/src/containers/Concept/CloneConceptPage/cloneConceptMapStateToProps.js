import {mapStateToPropsCommon} from '../conceptCommon';

export const mapStateToProps = ({cacheFromServer, locale, concept}) => {
    const {initialFormValues, flashMessage} = concept.clone;
    return {
        ...mapStateToPropsCommon({cacheFromServer}),
        initialFormValues,
        flashMessage
    }
};