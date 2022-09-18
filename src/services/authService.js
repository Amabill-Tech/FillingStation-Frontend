import APIs from './api';

const AuthService = {

    login: (data) => {
        return APIs.post('/login', data)
        .then(({ data }) => {
            setHeadersAndStorage(data);
            return data;
        })
         .catch(err => {
            console.log("Auth service err", err);
            throw err
        })
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
}

const setHeadersAndStorage = (data) => {
    APIs.defaults.headers['Authorization'] = `Bearer ${data.token}`
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
}

export default AuthService;