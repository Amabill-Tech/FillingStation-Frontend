import AuthService from '../../../services/auth/authService';
import { LOGIN, LOGOUT } from '../types/index';

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
    .then(data => {
        dispatch({ type: LOGIN, payload: data })
        history.push('/')
    })
    .catch(err => {
            
    })
}

export const logout = () => dispatch => {
    AuthService.logout()
    dispatch({ type: LOGOUT })
}