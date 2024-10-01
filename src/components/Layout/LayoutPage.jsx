import React, { useEffect, useState } from "react"
import NavbarLg from "../Home/NavbarLg"
import { useNavigate } from "react-router";
import pregencyImg from "../../assets/pregency.png"
import axios from "axios";
import NavbarSm from "../Home/NavbarSm";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUsers } from "../Service/user.service";
import { getUserAuth } from "../Service/userAuth.service";
import NavbarAdm from "../Home/NavbarAdm";
import NavbarLgAdm from "../Home/NavbarLgAdm";

const LayoutPage = ({children}) => {
    const navigate = useNavigate();
    const isAuth = localStorage.getItem('token');
    const nik = localStorage.getItem('nik');
    const [user, setUser] = useState({});
    const [identitasId, setIdentitasId] = useState(null);
    const [hasFetched, setHasFetched] = useState(false); // State baru untuk mencegah fetch ulang

    const getUser = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth}`;
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/user`);
            setUser(response.data);
            sessionStorage.setItem('user_id', response.data.id);

            // Cek identitas kehamilan aktif
            const identitasAktif = response.data.identitas_bumil.filter((item) => item.status_kehamilan == 1);
            if (identitasAktif.length > 0) {
                setIdentitasId(identitasAktif[identitasAktif.length - 1]);
                sessionStorage.setItem('identitas_id', identitasAktif[identitasAktif.length - 1].id);
            }
            setHasFetched(true); // Tandai bahwa data sudah di-fetch
        } catch (error) {
            // Arahkan ke halaman login jika token tidak valid
            localStorage.removeItem('token');
            navigate("/", { replace: true });
        }
    };
    // console.log(user.identitas_bumil)
    // console.log(identitasId)
    useEffect(() => {
        if (!isAuth) {
            navigate("/", { replace: true });
        } else if (!hasFetched) { // Hanya fetch jika belum di-fetch
            getUser();
        }
    }, [isAuth, hasFetched, navigate]);

    const handleLogout = async () => {
        const confirmLogout = window.confirm('Apakah Anda Ingin LogOut?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('identitas_id');
            navigate("/", { replace: true });
        }
    };

    return (
        <>
        <section className=" flex flex-wrap w-[90%] shadow-lg">
            <div className="flex lg:hidden sticky top-10 z-[30] w-full  items-center mt-2 justify-end">

                <button className="lg:hidden btn btn-md " onClick={handleLogout}>Log Out <FontAwesomeIcon icon={faArrowCircleLeft}/></button>
            </div>
            <nav id="navLg" className="hidden lg:block w-full p-1 sticky top-0 z-[30]">
            {nik == 112 ? <NavbarLgAdm/> : <NavbarLg/>}  
            </nav> 
                <div className="relative w-full bg-center bg-no-repeat bg-cover rounded-sm">
                <div className="absolute inset-0"></div>
                    <div className="relative min-h-[80vh]">
                        {children}
                    </div>
                </div>
            <nav id="navSm" className="block lg:hidden w-full p-1 sticky bottom-0 z-[30]">
            {nik == 112 ? <NavbarAdm/> : <NavbarSm/>}    
            </nav>
        </section>
        </>
    )
}

export default LayoutPage