import axios from "axios";

export const getChecklist = (callback) => {
    const userId = sessionStorage.getItem('identitas_id');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/ttdmonitoring/${userId}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
};