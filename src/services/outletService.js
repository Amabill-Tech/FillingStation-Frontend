import APIs from './api';
import { openModal } from '../store/actions/outlet';
import store from '../store';

const OutletService = {

    registerFillingStation: (data) => {
        return APIs.post('/station/create', data)
        .then(({ data }) => {
            store.dispatch(openModal(4));
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    registerTanks: (data) => {
        return APIs.post('/station/tanks/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    registerPumps: (data) => {
        return APIs.post('/station/pump/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default OutletService;