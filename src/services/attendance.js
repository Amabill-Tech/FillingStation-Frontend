import APIs from './api';

const AtendanceService = {

    createAttendance: (data) => {
        return APIs.post('/hr/attendance/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    allAttendanceRecords: (data) => {
        return APIs.post('/hr/attendance/allRecords', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default AtendanceService;