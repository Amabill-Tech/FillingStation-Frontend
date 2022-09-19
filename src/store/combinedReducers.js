import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import outletReducer from './reducers/outlet';

export default combineReducers({
    authReducer,
    outletReducer,
})