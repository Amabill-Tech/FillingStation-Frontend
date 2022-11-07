import { 
    BANK_PAYMENT, 
    SEARCH_BANK_PAYMENT,
    POS_PAYMENT,
    SEARCH_POS_PAYMENT
} from '../types';

export const allBankPayment = (params) => dispatch => {
    dispatch({ type: BANK_PAYMENT, payload: params});
}

export const searchBankPayment = (params) => dispatch => {
    dispatch({ type: SEARCH_BANK_PAYMENT, payload: params });
}

export const allPosPayment = (params) => dispatch => {
    dispatch({ type: POS_PAYMENT, payload: params});
}

export const searchPosPayment = (params) => dispatch => {
    dispatch({ type: SEARCH_POS_PAYMENT, payload: params });
}