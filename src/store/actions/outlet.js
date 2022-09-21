import OutletService from '../../services/outletService';
import { 
    SPINNER, 
    REMOVE_SPINNER, 
    OPEN_MODAL, 
    CLOSE_MODAL, 
    NEW_OUTLET, 
    NEW_TANK,
    TANK_LIST
} from '../types';

export const createFillingStation = (params) => dispatch => {
    return OutletService.registerFillingStation(params)
    .then(data => {
        dispatch({ type: NEW_OUTLET, payload: data});
    })
    .catch(err => {
            
    })
}

export const createTanks = (params) => dispatch => {
    return OutletService.registerTanks(params)
    .then(data => {
        dispatch({type: NEW_TANK, payload: data})
    })
    .catch(err => {
            
    })
}

export const getAllOutletTanks = (params) => dispatch => {
    return OutletService.getAllOutletTanks(params)
    .then(data => {
        dispatch({type: TANK_LIST, payload: data})
    })
    .catch(err => {
            
    })
}

export const createPumps = (params) => dispatch => {
    return OutletService.registerPumps(params)
    .then(data => {
        console.log(data)
    })
    .catch(err => {
            
    })
}

export const openModal = (param) => dispatch => {
    dispatch({ type: OPEN_MODAL, payload: param })
}

export const closeModal = (param) => dispatch => {
    dispatch({ type: CLOSE_MODAL, payload: param })
}

export const setSpinner = () => dispatch => {
    dispatch({ type: SPINNER })
}

export const removeSpinner = () => dispatch => {
    dispatch({ type: REMOVE_SPINNER })
}
