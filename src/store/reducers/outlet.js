import { Satellite } from '@mui/icons-material'
import { 
    SPINNER, 
    REMOVE_SPINNER, 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    NEW_OUTLET, 
    NEW_TANK 
} from '../types'

const initialState = {
    openModal: 0,
    loadingSpinner: false,
    newOutlet: {},
    newTank: {},
}

const outletReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case OPEN_MODAL:{
            return {
                ...state,
                openModal: payload,
            }
        }

        case CLOSE_MODAL:{
            return {
                ...state,
                openModal: payload,
            }
        }

        case SPINNER:{
            return {
                ...state,
                loadingSpinner: true,
            }
        }

        case REMOVE_SPINNER:{
            return {
                ...state,
                loadingSpinner: false,
            }
        }

        case NEW_OUTLET: {
            return {
                ...state,
                newOutlet: payload
            }
        }

        case NEW_TANK: {
            return {
                ...state,
                newTank: payload
            }
        }

        default: {
            return state
        }
    }

}

export default outletReducer