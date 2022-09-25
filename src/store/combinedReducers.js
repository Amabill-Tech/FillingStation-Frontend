import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import outletReducer from './reducers/outlet';
import lpoReducer from './reducers/lpo';
import productOrderReducer from './reducers/productOrder';

export default combineReducers({
    authReducer,
    outletReducer,
    lpoReducer,
    productOrderReducer,
})