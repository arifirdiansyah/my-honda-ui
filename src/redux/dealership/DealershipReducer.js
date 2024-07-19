import DealershipAction from "./DealershipAction";

const initDealershipState = {
    isLoading: false,
    dealerships: [],
};

export default function DealershipReducer(state = initDealershipState, { type, payload }) {
    switch ( type ) {
        case DealershipAction.LOAD_DEALERSHIP_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case DealershipAction.LOAD_DEALERSHIP_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                dealerships: payload.items
            }
        }

        default:
            return state;
    }
}
