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
    ONE_TANK,
    ONE_STATION,
    SEARCH_STATION,
    SELECTED_PUMPS,
    DESELECTED_PUMPS,
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
    oneStation: {},
    searchStation:[]
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
                allOutlets: payload,
                searchStation: payload
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
            const load = payload.map(data => {
                let craze = {...data};
                craze['identity'] = null;
                craze['closingMeter'] = "0";
                return craze;
            })
            
            return {
                ...state,
                pumpList: load
            }
        }

        case SEARCH_STATION:{
            const search = state.searchStation.filter(data => !data.outletName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.state.toUpperCase().indexOf(payload.toUpperCase()) || !data.city.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                allOutlets: search,
            }
        }

        case ONE_TANK: {
            return {
                ...state,
                oneTank: payload
            }
        }

        case ONE_STATION: {
            return {
                ...state,
                oneStation: payload
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

        case SELECTED_PUMPS: {
            const list = [...state.pumpList]
            const item = {...payload};
            const index = list.indexOf(payload);
            item['identity'] = index;
            list[index] = item;

            return {
                ...state,
                pumpList: list
            }
        }

        case DESELECTED_PUMPS: {
            const list = [...state.pumpList]
            const item = {...payload};
            const index = list.indexOf(payload);
            item['identity'] = null;
            list[index] = item;

            return {
                ...state,
                pumpList: list,
            }
        }

        default: {
            return state
        }
    }

}

export default outletReducer