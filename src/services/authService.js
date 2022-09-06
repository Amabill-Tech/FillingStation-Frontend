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
        APIs.defaults.headers['Authorization'] = '';
        APIs.defaults.baseURL = 'http://127.0.0.1:4000/ums/auth/api';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
}

const setHeadersAndStorage = (data) => {
    APIs.defaults.headers['Authorization'] = `Bearer ${data.token}`
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    localStorage.setItem('baseURL', 'http://127.0.0.1:4000/ums/senate/api')
}

export default AuthService;