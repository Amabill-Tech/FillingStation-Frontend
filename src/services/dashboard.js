import APIs from './api';

const DashboardService = {

    allAttendanceRecords: (data) => {
        return APIs.post('/dashboard/dashboard-records', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    allSalesRecords: (data) => {
        return APIs.post('/dashboard/dashboard-rages', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default DashboardService;