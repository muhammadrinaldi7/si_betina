import axios from "axios";

export const getUsersAll = async(callback) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.get(`${import.meta.env.VITE_REACT_API_URL}/users`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error.message);
    });
};
