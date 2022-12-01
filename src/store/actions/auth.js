import AuthService from '../../services/authService';
import { LOGIN, LOGOUT, SPINNER, REMOVE_SPINNER, UPDATE_USER_DATA } from '../types';

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
    .then(data => {
        dispatch({ type: LOGIN, payload: data });
        if(data.user.userType === "admin" || data.user.userType === "superAdmin") history.push('/home');
    })
    .catch(err => {
            
    })
}

export const register = (params) => {
    return AuthService.register(params)
    .then(data => {
        console.log(data)
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

export const updateUser = (param) => dispatch => {
    dispatch({ type: UPDATE_USER_DATA, payload: param })
}