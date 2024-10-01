import { useNavigate } from "react-router";
import LayoutPage from "../Layout/LayoutPage"
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../Service/user.service";
import { getPemeriksaan } from "../Service/pemeriksaan.service";
import { Link,useLocation } from "react-router-dom";
import { AlertIdentitas } from "../Alert/AlertIdentitas";
import { Notification } from "../Alert/Notification";
import { getCurrentIdentitas } from "../Service/identitas.service";

const Index = () => {
    const userId = sessionStorage.getItem('user_id')
    const [pemeriksaan, setPemeriksaan] = useState(null)
    const isAuth = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [curridentitas, setCurridentitas] = useState(null);
    const navigate = useNavigate();
    let [error, setError] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { hemoglobin, diagnosa, tindakan,tanggalPeriksaBerikutnya } = location.state || {};

    const openModal = async (id) => {
        try {
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/pemeriksaan/${id}`);
            setSelectedData(response.data.data);
            // Buka modal setelah data didapatkan
            document.getElementById('my_modal_3').showModal();
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error seperti menampilkan notifikasi error
        }
    };
    // console.log(selectedData)
    
    // console.log(pemeriksaan)
    // console.log(pemeriksaan.length)
    useEffect(() => {
        getCurrentIdentitas((data) => {
            const currentIdentitas = data.data
            setCurridentitas(currentIdentitas);
            setIsLoading(false);
        })  
            getPemeriksaan((data) => {
                const currentPemeriksaan = data.data;
            setPemeriksaan(currentPemeriksaan);
            setIsLoading(false);
        })
       
    },[])
    // console.log(curridentitas)
    // console.log(curridentitas.data)
    // console.log(pemeriksaan)

    console.log(pemeriksaan)
    
    console.log(curridentitas)
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-lg font-medium">Loading data...</p>
                    <div className="loader"></div> {/* Bisa menambahkan animasi loading */}
                </div>
            </div>
        );
    }

    if(curridentitas == 404 ){
        return (
        <LayoutPage>
            <div className="p-4">
            <AlertIdentitas 
            message="Identitas Tidak Ditemukan!" 
            details="Silahkan Anda Mengisi Data Identitas Terlebih Dahulu"
            link={<Link to="/identity" >Isi Data</Link> } />
            </div>
        </LayoutPage>
        )
    }
    
    return (
        <LayoutPage>
            {/* <Notification /> */}
            {hemoglobin && diagnosa && tindakan && (
                <Notification
                    message={`Haii Ibu ${user?.nama}!`}
                    detail={`Kondisi Ibu Sekarang ${diagnosa} dan Hemoglobin Ibu Sekarang ${hemoglobin} mg/dl, Sekarang Ibu Silahkan Konsumsi ${tindakan}.`}
                    date={`${tanggalPeriksaBerikutnya}`}
                />
            )}
            <article className="p-4 text-black bg-transparent border border-gray-700 rounded-xl">     
            {curridentitas !== null || curridentitas.data.length > 0 ?  (
                    <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faUser} className="object-cover rounded-full size-16" />
                    <div>
                    <h3 className="text-lg font-medium text-black">{curridentitas?.user?.nama}</h3>
                    <div className="flow-root">
                        <ul className="flex flex-wrap -m-1 text-black">
                        <li className="p-1 leading-none">
                            <a href="#" className="text-xs font-medium ">{curridentitas?.user?.umur} / th </a>
                        </li>
                        <li className="p-1 leading-none">
                            <a href="#" className="text-xs font-medium "> {curridentitas?.alamat} </a>
                        </li>
                        {/* 
                        <li className="p-1 leading-none">
                            <a href="#" className="text-xs font-medium ">Website</a>
                        </li> */}
                        </ul>
                    </div>
                    </div>
                    </div>
                    ):(
                        <div className="flex items-center w-full h-full gap-4 skeleton">
                        <FontAwesomeIcon icon={faUser} className="object-cover rounded-full size-16 skeleton" />

                        <div>
                        <h3 className="w-full h-full text-lg font-medium text-black skeleton"></h3>
                        <div className="flow-root skeleton">
                            <ul className="flex flex-wrap -m-1 text-black">
                            <li className="p-1 leading-none ">
                                <a href="#" className="text-xs font-medium "> / th </a>
                            </li>

                            <li className="p-1 leading-none ">
                                <a href="#" className="text-xs font-medium ">  </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    )}   
            <ul className="mt-4 space-y-2">
                <li>
                    <Link to="/pemeriksaan-add" className="flex justify-between h-full p-4 border border-gray-700 rounded-lg bg-white/70 hover:border-pink-600">
                        <strong className="font-medium text-black">Pemeriksaan </strong><span className="text-xl font-medium text-green-600"><FontAwesomeIcon icon={faPlusSquare} /></span>
                        {/* <p className="mt-1 text-xs font-medium text-black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
                        unde ab ut in!
                        </p> */}
                    </Link>
                </li>
                {pemeriksaan?.length > 0 ? pemeriksaan?.map((data, index) => (
                    <li key={index}>
                        <div className="flex flex-row justify-between h-full p-4 border border-gray-700 rounded-lg hover:border-pink-600"  onClick={() => openModal(data.id)}>
                        <div className="text-sm font-medium text-black">
                            <p>Pemeriksaan Ke- {index + 1}</p>
                            <p>{data.tanggal_periksa}</p>
                        </div>
                        <div className="text-xl font-medium text-black">
                            <FontAwesomeIcon icon={faEye} />
                        </div>
                        </div>
                    </li>
                    ))
                : (
                <li>
                    <div className="flex justify-center text-xl font-medium text-black">
                    Belum ada pemeriksaan
                    </div>
                </li>
                )}
            </ul>
              {/* Modal */}
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* Button untuk menutup modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <h3 className="text-lg font-bold">Detail Pemeriksaan</h3>
                    {selectedData ? selectedData?.map((item) => (
                        <div className="py-4">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Tanggal Pemeriksaan</td>
                                        <td>{item.tanggal_periksa}</td>
                                    </tr>
                                    <tr>
                                        <td>Hemoglobin</td>
                                        <td>{item.hemoglobin}</td>
                                    </tr>
                                    <tr>
                                        <td>Diagnosa</td>
                                        <td>{item.diagnosa_anemia}</td>
                                    </tr>
                                    <tr>
                                        <td>Tindakan</td>
                                        <td>{item.tindakan}</td>
                                    </tr>
                                    <tr>
                                        <td>Tanggal Periksa Berikutnya</td>
                                        <td>{item.tgl_periksa_berikutnya}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <p>Tanggal Pemeriksaan: {selectedData.tanggal_periksa}</p>
                            <p>Hemoglobin: {selectedData.hemoglobin} mg/dl</p>
                            <p>Diagnosa: {selectedData.diagnosa_anemia}</p>
                            <p>Tindakan: {selectedData.tindakan}</p> */}
                        </div>
                    )) : (
                        <p className="py-4">Loading...</p>
                    )}
                </div>
            </dialog>
            </article>
        </LayoutPage>
    )
}

export default Index