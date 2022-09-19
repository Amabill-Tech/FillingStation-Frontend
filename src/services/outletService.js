import APIs from './api';

const OutletService = {

    registerFillingStation: (data) => {
        return APIs.post('/register-filling-station', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    registerTanks: (data) => {
        return APIs.post('/register-tanks', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    registerPumps: (data) => {
        return APIs.post('/register-pumps', data)
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