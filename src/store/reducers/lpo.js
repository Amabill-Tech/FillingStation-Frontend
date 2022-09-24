import { 
    CREATE_LPO 
} from '../types'

const initialState = {
    lpo: [],
}

const lpoReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case CREATE_LPO:{
            return {
                ...state,
                lpo: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default lpoReducer;