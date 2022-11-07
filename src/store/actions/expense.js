import { 
    EXPENSE, 
    SEARCH_EXPENSE
} from '../types';

export const allExpenses = (params) => dispatch => {
    dispatch({ type: EXPENSE, payload: params});
}


export const searchExpenses = (params) => dispatch => {
    dispatch({ type: SEARCH_EXPENSE, payload: params });
}