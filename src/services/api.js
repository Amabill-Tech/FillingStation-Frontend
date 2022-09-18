import axios from 'axios';
import store from '../store';
import { logout, removeSpinner } from '../store/actions/auth';
import swal from 'sweetalert';

const APIs = axios.create({
    baseURL: 'http://127.0.0.1:3000/360-station/api',
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

        if (err.response.status !== 404) {
            store.dispatch(removeSpinner());
            swal("Warning!", "Incorrect password", "error");
            throw err
        }

        if (err.response.status !== 401) {
            store.dispatch(logout());
            swal("Warning!", "Session has expired", "error");
            throw err
        }
    }
);

export default APIs;