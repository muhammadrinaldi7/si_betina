
export const getUserAuth = async (callback) =>{
    try {
        const userId = sessionStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.get(`${import.meta.env.VITE_REACT_API_URL}/user/${userId}`).then((response) =>{
            sessionStorage.setItem('user_id', response.data.id);
            callback(response.data);
        })
    } catch (error) {
       if(error.response.status === 401 || error){
        localStorage.removeItem('token');
        navigate("/", { replace: true });
       }
    }
}