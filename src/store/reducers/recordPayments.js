import { 
    BANK_PAYMENT, 
    SEARCH_BANK_PAYMENT,
    POS_PAYMENT,
    SEARCH_POS_PAYMENT
} from '../types'

const initialState = {
    bank: [],
    searchBank: [],
    pos:[],
    searchPos: []
}

const recordPaymentReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case BANK_PAYMENT:{
            return {
                ...state,
                bank: payload,
                searchBank: payload,
            }
        }

        case SEARCH_BANK_PAYMENT:{
            const search = state.searchBank.filter(data => !data.position.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.level.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                bank: search,
            }
        }

        case POS_PAYMENT:{
            return {
                ...state,
                pos: payload,
                searchPos: payload,
            }
        }

        case SEARCH_POS_PAYMENT:{
            const search = state.searchPos.filter(data => !data.position.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.level.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                pos: search,
            }
        }

        default: {
            return state
        }
    }
}

export default recordPaymentReducer;