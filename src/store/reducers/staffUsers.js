import { 
    STAFF_USER 
} from '../types'

const initialState = {
    staffUsers: [],
}

const staffUserReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case STAFF_USER:{
            return {
                ...state,
                staffUsers: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default staffUserReducer;