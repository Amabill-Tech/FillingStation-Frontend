import { 
    STAFF_USER, 
    SEARCH_USERS,
} from '../types';

export const storeStaffUsers = (params) => dispatch => {
    dispatch({ type: STAFF_USER, payload: params});
}

export const searchStaffs = (params) => dispatch => {
    dispatch({ type: SEARCH_USERS, payload: params });
}