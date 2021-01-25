import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend.erohoshi.com/'
    // baseURL: 'http://localhost:8080/'
})

export const axios_object = axios;