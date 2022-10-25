import { 
    CREATE_INCOMING_ORDER ,
    SEARCH_INCOMING_ORDERS
} from '../types'

const initialState = {
    incomingOrder: [],
    searchData: []
}

const incomingOrderReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case CREATE_INCOMING_ORDER:{
            return {
                ...state,
                incomingOrder: payload,
                searchData: payload
            }
        }

        case SEARCH_INCOMING_ORDERS:{
            const search = state.searchData.filter(data => !data.depotStation.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.product.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                incomingOrder: search,
            }
        }

        default: {
            return state
        }
    }
}

export default incomingOrderReducer;