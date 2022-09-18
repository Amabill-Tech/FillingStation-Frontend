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

        if (err.response.status === 404) {
            swal("Error!", err.response.data.message, "error");
            store.dispatch(removeSpinner());
        }

        if (err.response.status === 401) {
            swal("Error!", "Incorrect Password", "error");
            store.dispatch(logout());
        }
    }
);

export default APIs;