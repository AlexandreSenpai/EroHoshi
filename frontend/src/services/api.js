import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://backend.erohoshi.com/'
})

export const axios_object = axios;