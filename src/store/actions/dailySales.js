import { 
    SALES_DATA, 
} from '../types';

export const passAllDailySales = (params) => dispatch => {
    dispatch({ type: SALES_DATA, payload: params});
}
