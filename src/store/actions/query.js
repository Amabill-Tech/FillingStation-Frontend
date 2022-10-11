import { 
    QUERY, 
    SEARCH_QUERY
} from '../types';

export const createQuery = (params) => dispatch => {
    dispatch({ type: QUERY, payload: params});
}

export const searchQuery = (params) => dispatch => {
    dispatch({ type: SEARCH_QUERY, payload: params });
}