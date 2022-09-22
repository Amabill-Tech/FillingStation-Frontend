import APIs from './api';
import swal from 'sweetalert';

const OutletService = {

    registerFillingStation: (data) => {
        return APIs.post('/station/create', data)
        .then(({data}) => {
            return data.outlet;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllOutletStations: (data) => {
        return APIs.post('/station/allRecords', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    registerTanks: (data) => {
        return APIs.post('/station/tank/create', data)
        .then(({ data }) => {
            return data.tank;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        }).then(()=>{
            swal("Success!", "Tank created successfully", "success");
        });
    },

    getAllOutletTanks: (data) => {
        return APIs.post('/station/tank/allRecords', data)
        .then(({ data }) => {
            return data.admin;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    activateTanks: (data) => {
        return APIs.post('/station/tank/activateTank', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    deleteTanks: (data) => {
        return APIs.post('/station/tank/delete', data)
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

    getAllStationPumps: (data) => {
        return APIs.post('/station/pump/allRecords', data)
        .then(({ data }) => {
            return data.pump;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    activatePumps: (data) => {
        return APIs.post('/station/pump/activatePump', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    deletePump: (data) => {
        return APIs.post('/station/pump/delete', data)
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