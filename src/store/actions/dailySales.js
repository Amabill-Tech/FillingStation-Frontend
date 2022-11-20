import { 
    SALES_DATA, 
    EXPENSES_AND_PAYMENTS,
    DAILY_INCOMING_ORDER
} from '../types';

export const passAllDailySales = (params) => dispatch => {
    dispatch({ type: SALES_DATA, payload: params});
}

export const passExpensesAndPayments = (params) => dispatch => {
    dispatch({ type: EXPENSES_AND_PAYMENTS, payload: params});
}

export const passIncomingOrder = (params) => dispatch => {
    dispatch({ type: DAILY_INCOMING_ORDER, payload: params});
}
