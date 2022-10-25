import { 
    CREATE_PRODUCT_ORDER,
    SEARCH_PRODUCT_ORDER
} from '../types';

export const createProductOrder = (params) => dispatch => {
    dispatch({ type: CREATE_PRODUCT_ORDER, payload: params});
}

export const searchProduct = (params) => dispatch => {
    dispatch({ type: SEARCH_PRODUCT_ORDER, payload: params });
}