import { 
    TANK_UPDATE, 
} from '../types';

export const createTankUpdate = (params) => dispatch => {
    dispatch({ type: TANK_UPDATE, payload: params});
}