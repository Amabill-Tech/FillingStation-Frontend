import { LOGIN, LOGOUT } from '../types'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    //isLoggedIn: !!JSON.parse(localStorage.getItem('user')),
    isLoggedIn: true,

    //user: {},
    //token: '',
    //isLoggedIn: false
}

const authReducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case LOGIN:{
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isLoggedIn: true
            }
        }

        case LOGOUT:{
            return {
                ...state,
                user: {},
                token: '',
                isLoggedIn: false
            }
        }

        default: {
            return state
        }
    }

}

export default authReducer