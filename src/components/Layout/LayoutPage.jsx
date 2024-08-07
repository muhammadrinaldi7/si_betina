import React, { useEffect, useState } from "react"
import NavbarLg from "../Home/NavbarLg"
import { useNavigate } from "react-router";
import pregencyImg from "../../assets/pregency.png"
import axios from "axios";
import NavbarSm from "../Home/NavbarSm";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LayoutPage = ({children}) => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('token');
   
    useEffect(() => {
        if(!isAuth){
            navigate("/", { replace: true });
        }
    })
    const handleLogout = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/logout`).then(() =>{
            localStorage.removeItem('token');
        navigate("/", { replace: true });
        })
    }
    return (
        <>
        <section className="bg-gray-100/25 flex flex-wrap w-[90%] shadow-lg">
            <div className="flex lg:hidden sticky top-5 z-[30] w-full  items-end mt-2 justify-end">
                <button className="lg:hidden btn btn-md " onClick={handleLogout}>Log Out <FontAwesomeIcon icon={faArrowCircleLeft}/></button>
            </div>
            <nav id="navLg" className="hidden lg:block w-full p-1 sticky top-0 z-[30]">
            <NavbarLg/>
            </nav> 
                <div className="relative w-full bg-white/30 rounded-sm bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 bg-white/30 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
                    <div className="relative min-h-[80vh]">
                        {/* <div className="max-w-xl text-center flex flex-wrap justify-center">
                        <img src={pregencyImg} className="" alt="" />
                        
                        <h1 className="text-2xl font-extrabold text-gray-800/50 lg:text-3xl">
                            <p className="text-xl lg:text-4xl">Haii Ibu <strong className="text-rose-500 uppercase">{user.nama}</strong> </p>
                            Mari Kita Deteksi Anemia di Awal Kehamilan.
                            <strong className="block font-extrabold text-rose-500"> Healthy Pregnancy. </strong>
                        </h1>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                            href="#"
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                            Get Started
                            </a>

                            <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                            Learn More
                            </a>
                        </div>
                        </div> */}
                        {children}
                    </div>
                </div>
            <nav id="navSm" className="block lg:hidden w-full p-1 sticky bottom-0 z-[30]">
            <NavbarSm/>
            </nav>
        </section>
        </>
    )
}

export default LayoutPage