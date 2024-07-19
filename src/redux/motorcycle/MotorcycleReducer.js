import MotorcycleAction from "./MotorcycleAction";

const initMotorcycleState = {
    isLoading: false,
    motorcycles: [],
    findMotorcycle: null,
    motorcycleDetail: null,
    services: [],
};

export default function MotorcycleReducer(state = initMotorcycleState, { type, payload }) {
    switch ( type ) {
        case MotorcycleAction.LOAD_MOTORCYCLE_REQUESTED:
        case MotorcycleAction.DELETE_MOTORCYCLE_REQUESTED:
        case MotorcycleAction.FIND_MOTORCYCLE_BY_VIN_REQUESTED:
        case MotorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_REQUESTED:
        case MotorcycleAction.ADD_MOTORCYCLE_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case MotorcycleAction.LOAD_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycles: payload.items
            }
        }
        case MotorcycleAction.ADD_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                findMotorcycle: null,
                motorcycles: [...state.motorcycles, payload.item]
            }
        }

        case MotorcycleAction.FIND_MOTORCYCLE_BY_VIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                findMotorcycle: payload.item
            }
        }

        case MotorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET: {
            return {
                ...state,
                isLoading: false,
                findMotorcycle: null
            }
        }

        case MotorcycleAction.DELETE_MOTORCYCLE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycles: state.motorcycles.filter((item) => {
                    return item.id !== payload.item.id;
                })
            }
        }

        case MotorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                services: payload.items
            }
        }

        case MotorcycleAction.LOAD_MOTORCYCLE_DETAIL_RESET: {
            return {
                ...state,
                isLoading: false,
                motorcycleDetail: null
            }
        }

        case MotorcycleAction.LOAD_MOTORCYCLE_DETAIL_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                motorcycleDetail: payload.item
            }
        }

        default:
            return state;
    }
}