import axios from 'axios';

const API_URL = "http://localhost:5000";

export const predictPrice = async (data) => {
    return axios.post(`${API_URL}/predict`, data).then(res => res.data);
};

export const createPayment = async (data) => {
    return axios.post(`${API_URL}/create-payment`, data).then(res => res.data);
};
