import { 
    SUPPLY 
} from '../types'

const initialState = {
    supply: [],
}

const supplyReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case SUPPLY:{
            return {
                ...state,
                supply: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default supplyReducer;