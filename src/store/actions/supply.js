import { 
    SUPPLY, 
} from '../types';

export const createSupply = (params) => dispatch => {
    dispatch({ type: SUPPLY, payload: params});
}