import { 
    STAFF_USER, 
} from '../types';

export const storeStaffUsers = (params) => dispatch => {
    dispatch({ type: STAFF_USER, payload: params});
}