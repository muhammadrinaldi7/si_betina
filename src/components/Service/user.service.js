import axios from "axios";

export const getUsers = async(callback) => {
    const userId = sessionStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.get(`${import.meta.env.VITE_REACT_API_URL}/identitas/${userId}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error.message);
    });
};

export const getDetailUser = async(id,callback) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.get(`${import.meta.env.VITE_REACT_API_URL}/users/${id}`).then((response) => {
        callback(response.data);
    }).catch((error) => {
        callback(error.message);
    });
}