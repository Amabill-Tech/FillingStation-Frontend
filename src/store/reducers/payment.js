import { 
    PAYMENT ,
    CERTIFICATE,
    RECEIPT,
} from '../types'

const initialState = {
    payment: [],
    certificate: {},
    receipt: {},
}

const paymentReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case PAYMENT:{
            return {
                ...state,
                payment: payload,
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

        default: {
            return state
        }
    }
}

export default paymentReducer;