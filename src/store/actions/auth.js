import AuthService from '../../services/authService';
import { LOGIN, LOGOUT, SPINNER, REMOVE_SPINNER } from '../types';

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
    .then(data => {
        dispatch({ type: LOGIN, payload: data })
        history.push('/home');
    })
    .catch(err => {
            
    })
}

export const setSpinner = () => dispatch => {
    dispatch({ type: SPINNER })
}

export const removeSpinner = () => dispatch => {
    dispatch({ type: REMOVE_SPINNER })
}

export const logout = () => dispatch => {
    AuthService.logout()
    dispatch({ type: LOGOUT })
}