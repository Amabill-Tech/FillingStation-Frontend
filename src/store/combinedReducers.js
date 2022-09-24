import { combineReducers } from 'redux';
import authReducer from './reducers/auth';
import outletReducer from './reducers/outlet';
import lpoReducer from './reducers/lpo';

export default combineReducers({
    authReducer,
    outletReducer,
    lpoReducer,
})