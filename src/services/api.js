import axios from 'axios';
import store from '../../store';
import { logout } from '../../store/actions/auth';

const APIs = axios.create({
    baseURL: 'http://127.0.0.1:4000/ums/auth/api',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
});

APIs.interceptors.response.use(
    res => {
        return res
    },
    err => {

        if (err.response.status !== 401) {
            throw err
        }

        if (typeof err.response.data.error.name !== 'undefined') {
            if (err.response.data.error.name === 'TokenExpiredError') {
                store.dispatch(logout())
                throw err
            }
        }
    }
);

export default APIs;