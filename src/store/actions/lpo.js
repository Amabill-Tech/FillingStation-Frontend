import { 
    CREATE_LPO, 
} from '../types';

export const createLPO = (params) => dispatch => {
    dispatch({ type: CREATE_LPO, payload: params});
}