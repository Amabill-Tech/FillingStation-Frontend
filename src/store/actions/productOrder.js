import { 
    CREATE_PRODUCT_ORDER, 
} from '../types';

export const createProductOrder = (params) => dispatch => {
    dispatch({ type: CREATE_PRODUCT_ORDER, payload: params});
}