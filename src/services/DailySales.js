import APIs from './api';

const DailySalesService = {

    createSales: (data) => {
        return APIs.post('/daily-sales/create', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllSales: (data) => {
        return APIs.post('/daily-sales/allRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllLPOSales: (data) => {
        return APIs.post('/daily-sales/allLPOSalesRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    createRT: (data) => {
        return APIs.post('/return-to-tank/create', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllRT: (data) => {
        return APIs.post('/return-to-tank/allRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

}

export default DailySalesService;