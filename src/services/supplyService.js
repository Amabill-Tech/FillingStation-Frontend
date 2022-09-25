import APIs from './api';

const SupplyService = {

    createSupply: (data) => {
        return APIs.post('/supply/create', data)
        .then(({data}) => {
            return data.supply;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllSupply: (data) => {
        return APIs.post('/supply/allRecords', data)
        .then(({data}) => {
            return data.supply;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },
}

export default SupplyService;