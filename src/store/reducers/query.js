import { 
    QUERY,
    SEARCH_QUERY,
} from '../types'

const initialState = {
    query: [],
    searchData: [],
}

const queryReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case QUERY:{
            return {
                ...state,
                query: payload,
                searchData: payload,
            }
        }

        case SEARCH_QUERY:{
            const search = state.searchData.filter(data => !data.employeeName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.queryTitle.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                query: search,
            }
        }

        default: {
            return state
        }
    }
}

export default queryReducer;