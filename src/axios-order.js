import axios from 'axios';

let instance = axios.create({
    withCredentials: true
});

export default instance;