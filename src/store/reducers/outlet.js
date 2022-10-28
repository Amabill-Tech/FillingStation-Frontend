import { 
    SPINNER, 
    REMOVE_SPINNER, 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    NEW_OUTLET, 
    NEW_TANK,
    TANK_LIST,
    OUTLET_DATA,
    PUMP_LIST,
    SEARCH_USERS,
    ONE_TANK
} from '../types'

const initialState = {
    openModal: 0,
    loadingSpinner: false,
    newOutlet: {},
    allOutlets:[],
    newTank: {},
    tankList: [],
    searchData: [],
    pumpList: [],
    oneTank: {},
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
                tankList: payload,
                searchData: payload
            }
        }

        case PUMP_LIST: {
            return {
                ...state,
                pumpList: payload
            }
        }

        case SEARCH_USERS:{
            const search = state.searchData.filter(data => !data.tankName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.productType.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                tankList: search,
            }
        }

        case ONE_TANK: {
            return {
                ...state,
                oneTank: payload
            }
        }

        default: {
            return state
        }
    }

}

export default outletReducer