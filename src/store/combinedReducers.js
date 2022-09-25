import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import outletReducer from './reducers/outlet';
import lpoReducer from './reducers/lpo';
import productOrderReducer from './reducers/productOrder';
import incomingOrderReducer from './reducers/incomingOrder';
import supplyReducer from './reducers/supply';
import paymentReducer from './reducers/payment';
import tankUpdateReducer from './reducers/tankUpdate';

export default combineReducers({
    authReducer,
    outletReducer,
    lpoReducer,
    productOrderReducer,
    incomingOrderReducer,
    supplyReducer,
    paymentReducer,
    tankUpdateReducer,
})