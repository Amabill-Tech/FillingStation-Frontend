import { 
    CREATE_PRODUCT_ORDER 
} from '../types'

const initialState = {
    productOrder: [],
}

const productOrderReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case CREATE_PRODUCT_ORDER:{
            return {
                ...state,
                productOrder: payload,
            }
        }

        default: {
            return state
        }
    }
}

export default productOrderReducer;