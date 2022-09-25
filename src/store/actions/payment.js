import { 
    PAYMENT, 
} from '../types';

export const createPayment = (params) => dispatch => {
    dispatch({ type: PAYMENT, payload: params});
}