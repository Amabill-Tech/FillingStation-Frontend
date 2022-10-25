import { 
    SUPPLY, 
    SEARCH_SUPPLY
} from '../types';

export const createSupply = (params) => dispatch => {
    dispatch({ type: SUPPLY, payload: params});
}

export const searchSupply = (params) => dispatch => {
    dispatch({ type: SEARCH_SUPPLY, payload: params });
}