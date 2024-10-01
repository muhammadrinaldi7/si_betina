import React, { useEffect, useState } from "react";
import pregencyImg from "../../assets/pregency.png"
import LayoutPage from "../Layout/LayoutPage"
import axios from "axios";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import LogoKemenkes from "../../assets/kemenkes.png"
const Index = () =>{
    const isAuth = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const getUser = async () =>{
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`
            await axios.get(`${import.meta.env.VITE_REACT_API_URL}/user`).then((response) =>{
                setUser(response.data);
                sessionStorage.setItem('user_id', response.data.id);
            })
        } catch (error) {
           if(error.response.status === 401 || error){
            localStorage.removeItem('token');
            navigate("/", { replace: true });
           }
        }
    }
    // console.log(user)
    function handleToast () {
        if(sessionStorage.getItem('identityAddSuccess')){
            toast.success("Data Pendaftaran Berhasil", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",}
            );
            setTimeout(() => {
                sessionStorage.removeItem('identityAddSuccess');
            } , 4000)
        }
    }
    useEffect(() => {
        
        if(!isAuth){
            navigate("/", { replace: true });
        }else{
            getUser();
        }
        handleToast()
    }, [ isAuth ])
    return (
        <LayoutPage>
            <ToastContainer />
            <img src={LogoKemenkes} className="top-0 w-1/2 p-2 rounded-lg shadow-lg lg:w-1/4 bg-white/85" alt="" />
            <div className="flex flex-col items-center justify-center px-4 mx-auto my-auto text-center w-ful py-28">
                <img src={pregencyImg} className="" alt="" />
                <h1 className="text-2xl font-extrabold text-gray-800/50 lg:text-3xl">
                <p className="text-xl lg:text-4xl">Haii Ibu <strong className="uppercase text-rose-500">{user.nama}</strong> </p>
                    Mari Kita Deteksi Anemia di Awal Kehamilan.
                    {/* <strong className="block font-extrabold text-rose-500"> Bumil Sehat. </strong> */}
                </h1>
                <div className="flex flex-wrap gap-4 mt-8 text-center">
                    <Link to={"/education"} className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow-md bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">Hamil Bebas Anemia</Link>
                    {/* <a href="#"className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-rose-600 hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                    >
                    
                    </a> */}
                </div>
            </div>
        </LayoutPage>
    )
}

export default Index