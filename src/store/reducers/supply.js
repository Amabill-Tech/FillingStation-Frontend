import { 
    SUPPLY ,
    SEARCH_SUPPLY,
    PENDING_SUPPLY,
} from '../types'

const initialState = {
    supply: [],
    searchData: [],
    pendingSupply: [],
}

const supplyReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case SUPPLY:{
            return {
                ...state,
                supply: payload,
                searchData: payload
            }
        }

        case SEARCH_SUPPLY:{
            const search = state.searchData.filter(data => !data.transportationName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.productType.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                supply: search,
            }
        }

        case PENDING_SUPPLY: {
            return {
                ...state,
                pendingSupply: payload
            }
        }

        default: {
            return state
        }
    }
}

export default supplyReducer;