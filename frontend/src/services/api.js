import axios from 'axios';

export const api = axios.create({
    // baseURL: 'https://backend-dot-eroneko.ue.r.appspot.com/api/'
    baseURL: 'http://localhost:8080/api/'
})

export const axios_object = axios;