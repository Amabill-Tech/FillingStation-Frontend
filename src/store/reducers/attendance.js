import { 
    ATTENDANCE,
    SEARCH_ATTENDANCE,
} from '../types'

const initialState = {
    attendance: [],
    searchData: [],
}

const attendanceReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case ATTENDANCE:{
            return {
                ...state,
                attendance: payload,
                searchData: payload,
            }
        }

        case SEARCH_ATTENDANCE:{
            const search = state.searchData.filter(data => !data.employeeName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.timeIn.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                attendance: search,
            }
        }

        default: {
            return state
        }
    }
}

export default attendanceReducer;