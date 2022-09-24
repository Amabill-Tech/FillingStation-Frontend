import APIs from './api';

const LPOService = {

    createLPO: (data) => {
        return APIs.post('/lpo/create', data)
        .then(({data}) => {
            return data.lpo;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllLPO: (data) => {
        return APIs.post('/lpo/allRecords', data)
        .then(({data}) => {
            return data.lpo;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },
}

export default LPOService;