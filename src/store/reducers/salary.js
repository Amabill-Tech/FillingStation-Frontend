import { 
    SALARY,
    SEARCH_SALARY,
} from '../types'

const initialState = {
    salary: [],
    searchData: [],
}

const salaryReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case SALARY:{
            return {
                ...state,
                salary: payload,
                searchData: payload,
            }
        }

        case SEARCH_SALARY:{
            const search = state.searchData.filter(data => !data.position.toUpperCase().indexOf(payload.toUpperCase()) ||
                !data.range.toUpperCase().indexOf(payload.toUpperCase())
            );
            return {
                ...state,
                salary: search,
            }
        }

        default: {
            return state
        }
    }
}

export default salaryReducer;