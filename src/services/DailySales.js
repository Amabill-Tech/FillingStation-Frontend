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

    getAllDailyExpenses: (data) => {
        return APIs.post('/daily-sales/allExpensesRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllDailyPayments: (data) => {
        return APIs.post('/daily-sales/allPaymentsRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllDailyPOSPayments: (data) => {
        return APIs.post('/daily-sales/allPOSPaymentsRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllDailyIncomingOrder: (data) => {
        return APIs.post('/daily-sales/allIncomingOrderRecords', data)
        .then(({data}) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        });
    },

    getAllDailySupply: (data) => {
        return APIs.post('/daily-sales/allSupplyRecords', data)
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