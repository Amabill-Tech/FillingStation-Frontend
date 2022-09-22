import axios from 'axios';
import store from '../store';
import { logout, removeSpinner } from '../store/actions/auth';
import swal from 'sweetalert';

const APIs = axios.create({
    baseURL: 'http://66.29.128.83:8005/360-station/api',
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
            if (err.response.data.message !== "Incorrect password!") {
                if (err.response.data.error.name === 'TokenExpiredError') {
                    store.dispatch(logout());
                    window.location.href = "/login";
                    return
                }
            }

            swal("Error!", "Incorrect Password", "error");
            store.dispatch(logout());
        }
    }
);

export default APIs;