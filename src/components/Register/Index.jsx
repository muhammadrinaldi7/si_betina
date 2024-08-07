import React,{useState} from "react"
import axios from "axios"
import phonePregant from "../../assets/phone.png"
import bgPregant from "../../assets/bg.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowAltCircleRight, faCircleXmark, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
const Index = () =>{
    const [nik, setNik] = useState("");
    const [nama, setnama] = useState("");
    const [tglLahir, setTglLahir] = useState("");
    const [umur, setUmur] = useState("");

    const [validation, setValidation] = useState([]);

    //define history
    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("nik", nik);
        formData.append("nama", nama);
        formData.append("tgl_lahir", tglLahir);
        formData.append("umur", umur);
        await axios.post(`${import.meta.env.VITE_REACT_API_URL}/register`, formData).then(()=>{
            console.log('berhasil daftar');
            sessionStorage.setItem('registrationSuccess', 'true');
            navigate("/", { replace: true });  
        }).catch((err)=>{
            console.log('gagal daftar')
            const error = err.response.data
            setValidation(error)
        })
    }

    return(
        <>
        <section className="bg-transparent">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <section className="relative flex h-48 items-end bg-transparent lg:col-span-5 lg:h-full xl:col-span-6">
            <div className="absolute inset-0 right-0 box-border overflow-clip h-full w-full object-cover opacity-80 bg-transparent">
                <img src={bgPregant} className="object-none w-full mb-5 ml-10 overflow-clip lg:ml-0 lg:mb-0 object-right-bottom" alt="" />
            </div>
            <div className="hidden lg:relative lg:block lg:p-5">
                <NavLink className="block text-white" to="/">
                <span className="sr-only">Home</span>
                <img src={phonePregant} className="h-20" alt="" />
                </NavLink>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Si Betina 
                </h2>

                <p className="mt-4 text-xl leading-relaxed text-white/90">
                Sistem Informasi Ibu Hamil Minum FE Tidak Anemia
                </p>
            </div>
            </section>
            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
                <div className="relative -mt-16 block lg:hidden">
                <NavLink
                    className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                    to="/"
                >
                    <span className="sr-only">Home</span>
                     <img src={phonePregant} className="h-20" alt="" />
                </NavLink>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Si Betina
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                Sistem Informasi Ibu Hamil Minum FE Tidak Anemia
                </p>
                </div>

                <form onSubmit={handleRegister} className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    Nama
                    </label>
                    <input
                    type="text"
                    value={nama}
                    onChange={(e) => setnama(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                {
                validation.nama &&(
                    <div role="alert" className="alert mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>{validation.nama[0]}</span>
                        </div>
                )
                }
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    NIK
                    </label>
                    <input
                    type="text"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    id="LastName"
                    name="last_name"
                    className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {
                validation.nik &&(
                    <div role="alert" className="alert mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>{validation.nik[0]}</span>
                        </div>
                )
                }
                </div>
                <div className="col-span-3">
                    <label htmlFor="umur" className="block text-sm font-medium text-gray-700"> Umur </label>

                    <input
                    type="number"
                    value={umur}
                    onChange={(e) => setUmur(e.target.value)}
                    id="umur"
                    name="umur"
                    className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {
                validation.umur &&(
                    <div role="alert" className="alert mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>{validation.umur[0]}</span>
                        </div>
                )
                }
                </div>
                <div className="col-span-6">
                    <label htmlFor="tgl_lahir" className="block text-sm font-medium text-gray-700"> Tanggal Lahir </label>

                    <input
                    type="date"
                    value={tglLahir}
                    onChange={(e) => setTglLahir(e.target.value)}
                    id="tgl_Lahir"
                    name="tgl_lahir"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-md p-2 text-gray-700 shadow-sm"
                    />
                    {
                validation.tgl_lahir &&(
                    <div role="alert" className="alert mt-2 alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>{validation.tgl_lahir[0]}</span>
                        </div>
                )
                }
                </div>
                
                {/* <div className="col-span-6">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                    <input
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md p-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {
                validation.password &&(
                    <div role="alert" className="alert alert-error">
                        <FontAwesomeIcon icon={faCircleXmark} />
                        <span>{validation.password[0]}</span>
                        </div>
                )
                }
                </div> */}


                {/* <div className="col-span-6">
                    <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                        I want to receive emails about events, product updates and company announcements.
                    </span>
                    </label>
                </div> */}

                {/* <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                    </p>
                </div> */}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    type="submit"
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                    Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Anda sudah punya akun ?
                    <NavLink to="/" className="text-gray-700 underline">
                        Login
                    </NavLink>
                    {/* <a href="#" className="text-gray-700 underline">Log in</a>. */}
                    </p>
                </div>
                </form>
            </div>
            </main>
        </div>
        </section>
        </>
    )
}

export default Index