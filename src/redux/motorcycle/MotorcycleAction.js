const motorcycleAction = {
    LOAD_MOTORCYCLE_REQUESTED: '[Motorcycle] Load Motorcycle Requested',
    LOAD_MOTORCYCLE_SUCCESS: '[Motorcycle] Load Motorcycle Success',
    ADD_MOTORCYCLE_REQUESTED: '[Motorcycle] Add Motorcycle Requested',
    ADD_MOTORCYCLE_SUCCESS: '[Motorcycle] Add Motorcycle Success',
    DELETE_MOTORCYCLE_REQUESTED: '[Motorcycle] Delete Motorcycle Requested',
    DELETE_MOTORCYCLE_SUCCESS: '[Motorcycle] Delete Motorcycle Success',
    FIND_MOTORCYCLE_BY_VIN_REQUESTED: '[Motorcycle] Find Motorcycle By VIN Requested',
    FIND_MOTORCYCLE_BY_VIN_SUCCESS: '[Motorcycle] Find Motorcycle By VIN Success',
    FIND_MOTORCYCLE_BY_VIN_RESET: '[Motorcycle] Find Motorcycle By VIN Reset',
    LOAD_MOTORCYCLE_SERVICE_HISTORY_REQUESTED: '[Motorcycle] Load Motorcycle Service History Requested',
    LOAD_MOTORCYCLE_SERVICE_HISTORY_SUCCESS: '[Motorcycle] Load Motorcycle History Detail Success',
    LOAD_MOTORCYCLE_DETAIL_RESET: '[Motorcycle] Load Motorcycle Detail Reset',
    LOAD_MOTORCYCLE_DETAIL_SUCCESS: '[Motorcycle] Load Motorcycle Detail Success',

    loadMotorcycleRequested: () => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_REQUESTED
        }
    },

    loadMotorcycleSuccess: (items) => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_SUCCESS,
            payload: { items }
        }
    },

    addMotorcycleRequested: () => {
        return {
            type: motorcycleAction.ADD_MOTORCYCLE_REQUESTED
        }
    },

    addMotorcycleSuccess: (catalog) => {
        return {
            type: motorcycleAction.ADD_MOTORCYCLE_SUCCESS,
            payload: { item: catalog }
        }
    },

    deleteMotorcycleRequested: () => {
        return {
            type: motorcycleAction.DELETE_MOTORCYCLE_REQUESTED,
        }
    },

    deleteMotorcycleSuccess: (catalog) => {
        return {
            type: motorcycleAction.DELETE_MOTORCYCLE_SUCCESS,
            payload: { item: catalog }
        }
    },

    findMotorcycleByVinRequested: () => {
        return {
            type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_REQUESTED,
        }
    },

    findMotorcycleByVinSuccess: (motorcycle) => {
        return {
            type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_SUCCESS,
            payload: { item: motorcycle }
        }
    },

    findMotorcycleByVinReset: (motorcycle) => {
        return {
            type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET,
        }
    },

    loadMotorcycleServiceHistoryRequested: () => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_REQUESTED
        }
    },

    loadMotorcycleServiceHistorySuccess: (items) => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_SUCCESS,
            payload: { items }
        }
    },

    loadMotorcycleDetailSuccess: (motorcycle) => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_DETAIL_SUCCESS,
            payload: { item: motorcycle }
        }
    },

    loadMotorcycleDetailReset: (motorcycle) => {
        return {
            type: motorcycleAction.LOAD_MOTORCYCLE_DETAIL_RESET,
        }
    },

}

export default motorcycleAction;