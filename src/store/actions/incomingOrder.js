import { 
    CREATE_INCOMING_ORDER,
    SEARCH_INCOMING_ORDERS 
} from '../types';

export const createIncomingOrder = (params) => dispatch => {
    dispatch({ type: CREATE_INCOMING_ORDER, payload: params});
}

export const searchIncoming = (params) => dispatch => {
    dispatch({ type: SEARCH_INCOMING_ORDERS, payload: params });
}