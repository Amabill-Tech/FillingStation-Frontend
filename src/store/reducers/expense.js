import { 
    EXPENSE, 
    SEARCH_EXPENSE
} from '../types'

const initialState = {
    expense: [],
    searchData: []
}

const expenseReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case EXPENSE:{
            return {
                ...state,
                expense: payload,
                searchData: payload
            }
        }

        case SEARCH_EXPENSE:{
            const search = state.searchData.filter(data => !data.expenseName.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.dateCreated.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                expense: search,
            }
        }

        default: {
            return state
        }
    }
}

export default expenseReducer;