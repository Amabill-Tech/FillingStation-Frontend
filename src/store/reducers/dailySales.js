import { 
    SALES_DATA, 
    EXPENSES_AND_PAYMENTS,
    DAILY_INCOMING_ORDER,
    CUMMULATIVES,
    DAILY_SALES_SUPPLY
} from '../types'

const initialState = {
    dailySales: {},
    payments: {},
    dailyIncoming:[],
    cummulative: {},
    dailySupplies: {}
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

        case CUMMULATIVES: {
            return {
                ...state,
                cummulative: payload
            }
        }

        case DAILY_SALES_SUPPLY: {
            return {
                ...state,
                dailySupplies: payload
            }
        }

        default: {
            return state
        }
    }
}

export default dailySalesReducer;