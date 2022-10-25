import { 
    SUPPLY ,
    SEARCH_SUPPLY
} from '../types'

const initialState = {
    supply: [],
    searchData: []
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

        default: {
            return state
        }
    }
}

export default supplyReducer;