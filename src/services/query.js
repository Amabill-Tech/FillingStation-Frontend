import APIs from './api';

const QueryService = {

    createQuery: (data) => {
        return APIs.post('/hr/query/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    allQueryRecords: (data) => {
        return APIs.post('/hr/query/allRecords', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default QueryService;