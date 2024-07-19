import { message } from "antd";
import MotorcycleAction from "../../redux/motorcycle/MotorcycleAction";
import axiosHttp from "../../axiosHandler";
import motorcycleAction from "../../redux/motorcycle/MotorcycleAction";

export function getAllMotorcycle() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.LOAD_MOTORCYCLE_REQUESTED })
            const vehicleOwnership = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/vehicleOwnership`);
            dispatch({
                type: MotorcycleAction.LOAD_MOTORCYCLE_SUCCESS, payload: {
                    items: vehicleOwnership.data.map((item) => {
                        item.key = item.id;
                        return item
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data kendaraan");
        }
    }
}

export function addMotorcycleData(motorcycleId) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.ADD_MOTORCYCLE_REQUESTED })
            const response = await axiosHttp.post(`${process.env.REACT_APP_API_URL}/vehicleOwnership/add`, { motorcycleId });
            dispatch({ type: MotorcycleAction.ADD_MOTORCYCLE_SUCCESS, payload: { item: response.data } })
            message.success("Kendaraan berhasil ditambah");
        } catch ( error ) {
            message.error("Gagal menambah data kendaraan");
        }
    }
}


export function deleteMotorcycleData(motorcycle) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.DELETE_MOTORCYCLE_REQUESTED })
            await axiosHttp.delete(`${process.env.REACT_APP_API_URL}/vehicleOwnership/${motorcycle.id}`);
            dispatch({ type: MotorcycleAction.DELETE_MOTORCYCLE_SUCCESS, payload: { item: motorcycle } })
            message.success("Kendaraan berhasil dihapus");
        } catch ( error ) {
            message.error("Gagal menghapus kendaraan");
        }
    }
}

export function findMotorcycleByVinNumber(vin) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.FIND_MOTORCYCLE_BY_VIN_REQUESTED })
            const response = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/motorcycle/vin/${vin}`);
            dispatch({ type: MotorcycleAction.FIND_MOTORCYCLE_BY_VIN_SUCCESS, payload: { item: response.data } });
            message.success("Kendaraan berhasil ditemukan!");
        } catch ( error ) {
            dispatch({ type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET });
            message.error("Gagal menemukan kendaraan");
        }
    }
}

export function loadMotorcycleServiceHistory(motorcycleId) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: MotorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_REQUESTED })
            const response = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/services/${motorcycleId}`);
            dispatch({ type: MotorcycleAction.LOAD_MOTORCYCLE_SERVICE_HISTORY_SUCCESS, payload: { items: response.data } });
            message.success("Data service berhasil di muat!");
        } catch ( error ) {
            dispatch({ type: motorcycleAction.FIND_MOTORCYCLE_BY_VIN_RESET });
            message.error("Gagal memuat data service");
        }
    }
}