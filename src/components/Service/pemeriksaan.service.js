import axios from "axios";

export const getPemeriksaan = (callback) => {
    const userId = sessionStorage.getItem('identitas_id');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/pemeriksaanBumil/${userId}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
};