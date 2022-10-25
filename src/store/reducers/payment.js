import { 
    PAYMENT ,
    CERTIFICATE,
    RECEIPT,
    SEARCH_PAYMENT
} from '../types'

const initialState = {
    payment: [],
    certificate: {},
    receipt: {},
    searchData: []
}

const paymentReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case PAYMENT:{
            return {
                ...state,
                payment: payload,
                searchData: payload
            }
        }

        case RECEIPT: {
           return {
                ...state,
                receipt: payload
           }
        }

        case CERTIFICATE: {
            return {
                 ...state,
                 certificate: payload
            }
        }

        case SEARCH_PAYMENT:{
            const search = state.searchData.filter(data => !data.organisationalName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.contactPerson.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                payment: search,
            }
        }

        default: {
            return state
        }
    }
}

export default paymentReducer;