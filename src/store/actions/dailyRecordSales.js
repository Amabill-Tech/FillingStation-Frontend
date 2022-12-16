import { 
    DAILY_ALL_STATIONS, 
    ADMIN_STATION
} from '../types';

export const dailyRecordAllStations = (params) => dispatch => {
    dispatch({ type: DAILY_ALL_STATIONS, payload: params});
}

export const dailyRecordAdminStation = (params) => dispatch => {
    dispatch({ type: ADMIN_STATION, payload: params });
}