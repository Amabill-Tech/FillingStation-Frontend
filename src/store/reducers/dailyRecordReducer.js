import { 
    DAILY_ALL_STATIONS, 
    ADMIN_STATION
} from '../types';

const initialState = {
    allAdminStations: [],
    singleAdminStation: [],
}

const dailyRecordReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case DAILY_ALL_STATIONS:{
            return {
                ...state,
                allAdminStations: payload,
            }
        }

        case ADMIN_STATION:{
            return {
                ...state,
                singleAdminStation: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default dailyRecordReducer;