import { useEffect, useState } from "react"
import bumilImage from "../../assets/pregant.png"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/ReactToastify.css"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
const Index = () =>{
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('password', password);
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/login`, formData)
        .then((response) => {
            //set token on localStorage
            localStorage.setItem('token', response.data.token);
            //redirect to dashboard
            console.log("Berhasil Login")
            navigate("/homepage", { replace: true });
        }).catch((err)=>{
            console.log('gagal login')
            const error = err.response.data
            setValidation(error)
        })
    };
    
    useEffect(() => {
        const registrationSuccess = sessionStorage.getItem('registrationSuccess');
        if(registrationSuccess){
            toast.success('Registrasi Berhasil');
            setTimeout(() => {
                sessionStorage.removeItem('registrationSuccess');
            } , 3000)
        }
        if(localStorage.getItem('token')){
            navigate("/homepage", { replace: true });
        }
    }, [navigate])
    // console.log(user.data)
    return (
        <>
        <div className="hero bg-gradient-to-b from-[#EED7F5] via-[#FCCEC2] to-[#C6E1FC] min-h-screen">
        <div className="hero-content flex flex-col lg:flex-row-reverse">
            <div className="text-center rounded-md p-4  bg-white/35 lg:flex lg:flex-col lg:items-center lg:text-center">
                <div className=' box-border flex justify-center lg:w-[400px] h-[300px]'>
                    <img src={bumilImage} alt="" />
                </div>
            <h1 className="text-2xl font-bold text-wrap">"Teman Setia Ibu Hamil" </h1>
            <p className="py-1">
            Aplikasi ini adalah teman setia ibu hamil, menyediakan pemantauan perkembangan janin, jadwal pemeriksaan, dan informasi kesehatan terkini untuk kehamilan yang sehat dan bahagia.
            </p>
            </div>
            <div className="card bg-[#FFFFFF]/[0.3] w-full max-w-sm shrink-0 shadow-2xl">
            <ToastContainer />
            <form onSubmit={loginHandler} className="card-body" >
                {validation.message &&(
                    <div role="alert" className="alert text-sm mt-2 alert-error">
                        <span>{validation.message}</span>
                        </div>
                )
                }
                <div className="form-control">
                <label className="label">
                    <span className="label-text">NIK</span>
                </label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} 
                     placeholder="Masukkan 16 digit NIK" className="input input-bordered" />
                {validation.password &&(
                    <div role="alert" className="alert text-sm mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} className="hidden lg:block" />
                        <span>{validation.password[0]}</span>
                        </div>
                )
                }
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Nama</span>
                </label>
                <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} 
                     placeholder="Masukkan Nama Anda" className="input input-bordered" />
                {validation.nama &&(
                    <div role="alert" className="alert text-sm mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} className="hidden lg:block" />
                        <span>{validation.nama[0]}</span>
                        </div>
                )
                }
                </div>
               
                <div className="form-control mt-6">
                <button type='submit' className="btn bg-gradient-to-r from-[#8362D7] to-[#EE4964] text-white">MASUK</button>
               <p>Belum Punya Akun ? <NavLink to="/register" className='hover:text-[#EE4964] underline'>Register.</NavLink></p> 
                
                </div>
            </form>
            </div>
        </div>
        </div>
        </>
    )
}

export default Index