import { combineReducers } from 'redux';
import MotorcycleReducer from './../redux/motorcycle/MotorcycleReducer';
import UserReducer from './../redux/user/UserReducer';
import DealershipReducer from './../redux/dealership/DealershipReducer';

const rootReducer = combineReducers({
    MotorcycleReducer,
    UserReducer,
    DealershipReducer
});

export default rootReducer;
