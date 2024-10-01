import axios from "axios";

export const getAllPemeriksaan = (callback) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/pemeriksaan`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
};