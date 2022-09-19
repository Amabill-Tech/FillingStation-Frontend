import { SPINNER, REMOVE_SPINNER, OPEN_MODAL, CLOSE_MODAL } from '../types'

const initialState = {
    openModal: 0,
    loadingSpinner: false,
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

        default: {
            return state
        }
    }

}

export default outletReducer