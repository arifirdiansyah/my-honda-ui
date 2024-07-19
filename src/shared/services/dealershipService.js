import { message } from 'antd';
import DealershipAction from "../../redux/dealership/DealershipAction";
import axiosHttp from "../../axiosHandler";

export function getAllDealerships() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DealershipAction.LOAD_DEALERSHIP_REQUESTED });
            const response = await axiosHttp.get(`${process.env.REACT_APP_API_URL}/dealerships`);

            dispatch({
                type: DealershipAction.LOAD_DEALERSHIP_SUCCESS, payload: {
                    items: response.data.map((item, key) => {
                        item.key = key;
                        return item;
                    })
                }
            });
        } catch ( error ) {
            message.error("Gagal memuat data dealer");
        }
    }
}
