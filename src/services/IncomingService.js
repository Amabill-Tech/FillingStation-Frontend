import APIs from './api';

const IncomingService = {

    createIncoming: (data) => {
        return APIs.post('/incoming-order/create', data)
        .then(({data}) => {
            return data.incoming;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllIncoming: (data) => {
        return APIs.post('/incoming-order/allRecords', data)
        .then(({data}) => {
            return data.incoming;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },
}

export default IncomingService;