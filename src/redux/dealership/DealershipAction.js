const dealershipAction = {
    LOAD_DEALERSHIP_REQUESTED: '[Dealership] Load Dealership Requested',
    LOAD_DEALERSHIP_SUCCESS: '[Dealership] Load Dealership Success',

    loadDealershipRequested: () => {
        return {
            type: dealershipAction.LOAD_DEALERSHIP_REQUESTED
        }
    },

    loadDealershipSuccess: (items) => {
        return {
            type: dealershipAction.LOAD_DEALERSHIP_SUCCESS,
            payload: { items }
        }
    },

}

export default dealershipAction;
