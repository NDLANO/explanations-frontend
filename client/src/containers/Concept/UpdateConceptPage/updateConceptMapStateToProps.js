import {mapStateToProps as mstp} from '../mapStateToProps';

export const mapStateToProps = ({cacheFromServer, locale, concept}) => {
    const {initialFormValues, flashMessage} = concept.update;
    return {
        ...mstp({cacheFromServer}),
        initialFormValues,
        flashMessage
    }
};