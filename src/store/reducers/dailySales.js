import { 
    SALES_DATA, 
    EXPENSES_AND_PAYMENTS,
    DAILY_INCOMING_ORDER
} from '../types'

const initialState = {
    dailySales: {},
    payments: {},
    dailyIncoming:[],
}

const dailySalesReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case SALES_DATA:{
            return {
                ...state,
                dailySales: payload,
            }
        }

        case EXPENSES_AND_PAYMENTS:{
            return {
                ...state,
                payments: payload
            }
        }

        case DAILY_INCOMING_ORDER: {
            return {
                ...state,
                dailyIncoming: payload
            }
        }

        default: {
            return state
        }
    }
}

export default dailySalesReducer;