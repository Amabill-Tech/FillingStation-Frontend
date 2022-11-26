import { 
    DASHBOARD
} from '../types';

export const addDashboard = (params) => dispatch => {
    dispatch({ type: DASHBOARD, payload: params});
}
