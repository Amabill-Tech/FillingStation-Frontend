import { 
    ADMIN_USER, 
} from '../types';

export const createAdminUser = (params) => dispatch => {
    dispatch({ type: ADMIN_USER, payload: params});
}