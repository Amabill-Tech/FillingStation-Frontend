import { 
    SALES_DATA, 
    EXPENSES_AND_PAYMENTS,
    DAILY_INCOMING_ORDER,
    CUMMULATIVES,
    DAILY_SALES_SUPPLY,
    LPO_RECORDS,
    PAYMENTS_RECORDS,
    BULK_REPORTS
} from '../types'

const initialState = {
    dailySales: {},
    payments: {},
    dailyIncoming:[],
    cummulative: {},
    dailySupplies: {},
    lpoRecords: [],
    paymentRecords: {
        bankPayment: [],
        posPayment: [],
        expenses: []
    },
    bulkReports: {}
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

        case LPO_RECORDS:{
            return{
                ...state,
                lpoRecords: payload
            }
        }

        case PAYMENTS_RECORDS:{
            return{
                ...state,
                paymentRecords: payload
            }
        }

        case BULK_REPORTS: {
            return{
                ...state,
                bulkReports: payload
            }
        }

        default: {
            return state
        }
    }
}

export default dailySalesReducer;