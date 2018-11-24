import {mapStateToProps as mstp} from '../mapStateToProps';

export const mapStateToProps = ({cacheFromServer, locale, concept}) => {
    const {initialFormValues, flashMessage} = concept.clone;
    return {
        ...mstp({cacheFromServer}),
        initialFormValues,
        flashMessage
    }
};