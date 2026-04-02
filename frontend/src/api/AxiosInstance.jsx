import baseUrl from '../BaseUrl';
import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/api`,
    withCredentials: true, 
});