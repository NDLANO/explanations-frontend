export const mapStateToProps = ({cacheFromServer: {status, meta}, updateConcept}) => {

    return {
        meta: meta,
        status: status.map(x => ({value: x.id, label: x.name})),
        flashMessage: updateConcept
    }
};