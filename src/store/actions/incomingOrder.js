import { 
    CREATE_INCOMING_ORDER, 
} from '../types';

export const createIncomingOrder = (params) => dispatch => {
    dispatch({ type: CREATE_INCOMING_ORDER, payload: params});
}