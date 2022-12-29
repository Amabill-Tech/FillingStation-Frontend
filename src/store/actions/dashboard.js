import { 
    DASHBOARD,
    DASHBOARD_RECORDS,
    DASHBOARD_EMPLOYEES,
    SEARCH_DASH
} from '../types';

export const addDashboard = (params) => dispatch => {
    dispatch({ type: DASHBOARD, payload: params});
}

export const dashboardRecordMore = (params) => dispatch => {
    dispatch({ type: DASHBOARD_RECORDS, payload: params});
}

export const dashEmployees = (params) => dispatch => {
    dispatch({ type: DASHBOARD_EMPLOYEES, payload: params});
}

export const searchdashStaffs = (params) => dispatch => {
    dispatch({ type: SEARCH_DASH, payload: params});
}
