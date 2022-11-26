import { 
    DASHBOARD,
    DASHBOARD_RECORDS
} from '../types';

export const addDashboard = (params) => dispatch => {
    dispatch({ type: DASHBOARD, payload: params});
}

export const dashboardRecordMore = (params) => dispatch => {
    dispatch({ type: DASHBOARD_RECORDS, payload: params});
}
