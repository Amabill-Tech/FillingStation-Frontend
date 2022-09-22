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