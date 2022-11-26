import { 
    DASHBOARD
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

        default: {
            return state
        }
    }
}

export default dashboardReducer;