import { 
    ATTENDANCE, 
    SEARCH_ATTENDANCE
} from '../types';

export const createAttendance = (params) => dispatch => {
    dispatch({ type: ATTENDANCE, payload: params});
}

export const searchAttendance = (params) => dispatch => {
    dispatch({ type: SEARCH_ATTENDANCE, payload: params });
}