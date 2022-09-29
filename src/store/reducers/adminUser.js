import { 
    ADMIN_USER 
} from '../types'

const initialState = {
    adminUsers: [],
}

const adminUserReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case ADMIN_USER:{
            return {
                ...state,
                adminUsers: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default adminUserReducer;