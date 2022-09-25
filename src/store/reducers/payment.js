import { 
    PAYMENT 
} from '../types'

const initialState = {
    payment: [],
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

        default: {
            return state
        }
    }
}

export default paymentReducer;