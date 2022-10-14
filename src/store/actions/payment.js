import { 
    PAYMENT, 
    CERTIFICATE,
    RECEIPT
} from '../types';

export const createPayment = (params) => dispatch => {
    dispatch({ type: PAYMENT, payload: params});
}

export const certificate = (params) => dispatch => {
    dispatch({ type: CERTIFICATE, payload: params});
}

export const reciepts = (params) => dispatch => {
    dispatch({type: RECEIPT, payload: params});
}