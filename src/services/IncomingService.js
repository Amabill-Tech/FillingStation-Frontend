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

    updateIncoming: (data) => {
        return APIs.post('/incoming-order/update', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllIncoming: (data) => {
        return APIs.post('/incoming-order/allRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllIncoming2: (data) => {
        return APIs.post('/incoming-order/allRecords2', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getOneIncoming: (data) => {
        return APIs.post('/incoming-order/oneIncoming', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },
}

export default IncomingService;