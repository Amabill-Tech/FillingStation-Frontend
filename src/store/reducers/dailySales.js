import { 
    SALES_DATA, 
} from '../types'

const initialState = {
    dailySales: {},
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

        default: {
            return state
        }
    }
}

export default dailySalesReducer;