import { 
    ADMIN_USER, 
    SEARCH_USERS
} from '../types';

export const createAdminUser = (params) => dispatch => {
    dispatch({ type: ADMIN_USER, payload: params});
}

export const searchadmins = (params) => dispatch => {
    dispatch({ type: SEARCH_USERS, payload: params });
}