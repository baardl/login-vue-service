import axios from 'axios';

const apiConfig = {
    returnRejectedPromiseOnError: true,
    timeout: 30000,
    headers: {
        common: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    },
};

const request = axios.create(apiConfig);
export default request;