import { 
    DASHBOARD,
    DASHBOARD_RECORDS
} from '../types'

const initialState = {
    dashboardData: {
        count:0,
        tanks: {
            activeTank: {count:0, list:[]},
            inActiveTank: {count:0, list:[]}
        },
        pumps: {
            activePumps: {count:0, list:[]},
            inActivePumps: {count:0, list:[]}
        },
    },
    dashboardRecords: {
        sales: {
            totalAmount: 0,
            totalVolume: 0,
        }
    }
}

const dashboardReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case DASHBOARD:{
            return {
                ...state,
                dashboardData: payload
            }
        }

        case DASHBOARD_RECORDS: {
            return{
                ...state,
                dashboardRecords: payload
            }
        }

        default: {
            return state
        }
    }
}

export default dashboardReducer;