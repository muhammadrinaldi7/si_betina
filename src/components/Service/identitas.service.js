import axios from "axios";

export const getIdentitas = (callback) => {
    const userId = sessionStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/identitas/${userId}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
};
export const getCurrentIdentitas = (callback) => {
    const userId = sessionStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/currentIdentitas/${userId}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
};

export const getDetailIdentitas = (id,callback) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.get(`${import.meta.env.VITE_REACT_API_URL}/dataDetailIdentitas/${id}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error);
    });
}