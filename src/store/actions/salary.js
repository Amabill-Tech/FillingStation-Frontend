import { 
    SALARY, 
    SEARCH_SALARY
} from '../types';

export const createSalary = (params) => dispatch => {
    dispatch({ type: SALARY, payload: params});
}

export const searchSalary = (params) => dispatch => {
    dispatch({ type: SEARCH_SALARY, payload: params });
}