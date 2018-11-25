export const mapStateToProps = ({cacheFromServer: {status, meta}}) => {

    return {
        meta: meta,
        status: status.map(x => ({value: x.id, label: x.name}))
    }
};