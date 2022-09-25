import { 
    TANK_UPDATE 
} from '../types'

const initialState = {
    tankUpdate: [],
}

const tankUpdateReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case TANK_UPDATE:{
            return {
                ...state,
                tankUpdate: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default tankUpdateReducer;