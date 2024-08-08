import React, { useEffect, useState } from "react";
import pregencyImg from "../../assets/pregency.png"
import LayoutPage from "../Layout/LayoutPage"
import axios from "axios";
const Index = () =>{
    const isAuth = localStorage.getItem('token');
    const [user, setUser] = useState({});
    const getUser = async () =>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`
        await axios.get(`${import.meta.env.VITE_REACT_API_URL}/user`).then((response) =>{
            setUser(response.data);
        })
    }
    useEffect(() => {
        if(!isAuth){
            navigate("/", { replace: true });
        }else{
            getUser();
        }
    }, [ isAuth ])
    return (
        <LayoutPage>
        <div className="w-ful items-center mx-auto my-auto py-28 px-4 text-center flex flex-col justify-center">
            <img src={pregencyImg} className="" alt="" />
            <h1 className="text-2xl font-extrabold text-gray-800/50 lg:text-3xl">
            <p className="text-xl lg:text-4xl">Haii Ibu <strong className="text-rose-500 uppercase">{user.nama}</strong> </p>
                Mari Kita Deteksi Anemia di Awal Kehamilan.
                <strong className="block font-extrabold text-rose-500"> Healthy Pregnancy. </strong>
            </h1>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
                <a href="#" className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">Get Started</a>
                <a href="#"className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                Learn More
                </a>
            </div>
        </div>
        </LayoutPage>
    )
}

export default Index