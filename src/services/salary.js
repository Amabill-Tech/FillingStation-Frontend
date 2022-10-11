import APIs from './api';

const SalaryService = {

    createSalary: (data) => {
        return APIs.post('/hr/salary/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    allSalaryRecords: (data) => {
        return APIs.post('/hr/salary/allRecords', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default SalaryService;