import APIs from './api';

const AdminUserService = {

    createAdminUsers: (data) => {
        return APIs.post('/hr/adminUsers/create', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    allAdminUserRecords: (data) => {
        return APIs.post('/hr/adminUsers/allRecords', data)
        .then(({ data }) => {
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },
}

export default AdminUserService;