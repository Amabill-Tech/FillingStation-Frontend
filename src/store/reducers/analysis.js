import { 
    ANALYSIS_DATA
} from '../types'

const initialState = {
    analysisData: {
        sales: [],
        lpo: [],
        rtVolumes: [],
        payments: [],
        pospayment: [],
        expenses: []
    },
}

const analysisReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case ANALYSIS_DATA:{
            return {
                ...state,
                analysisData: payload
            }
        }

        default: {
            return state
        }
    }
}

export default analysisReducer;