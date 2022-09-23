import { 
    SPINNER, 
    REMOVE_SPINNER, 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    NEW_OUTLET, 
    NEW_TANK,
    TANK_LIST,
    OUTLET_DATA,
    PUMP_LIST
} from '../types'

const initialState = {
    openModal: 0,
    loadingSpinner: false,
    newOutlet: {},
    allOutlets:[],
    newTank: {},
    tankList: [],
    pumpList: [],
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

        case OUTLET_DATA: {
            return {
                ...state,
                allOutlets: payload
            }
        }

        case NEW_TANK: {
            return {
                ...state,
                newTank: payload
            }
        }

        case TANK_LIST: {
            return {
                ...state,
                tankList: payload
            }
        }

        case PUMP_LIST: {
            return {
                ...state,
                pumpList: payload
            }
        }

        default: {
            return state
        }
    }

}

export default outletReducer