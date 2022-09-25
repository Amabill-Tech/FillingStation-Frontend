import { 
    CREATE_INCOMING_ORDER 
} from '../types'

const initialState = {
    incomingOrder: [],
}

const incomingOrderReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case CREATE_INCOMING_ORDER:{
            return {
                ...state,
                incomingOrder: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default incomingOrderReducer;