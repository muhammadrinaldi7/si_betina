import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../Button/Button"
import LayoutPage from "../Layout/LayoutPage"
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import anemia from "../../assets/anemia.jpg"
import { useEffect, useState } from "react"
import { getUsers } from "../Service/user.service"
import axios from "axios"
import { useNavigate } from "react-router"
import { getCurrentIdentitas } from "../Service/identitas.service"

const PemeriksaanAdd = () => {
    const [hemoglobin, setHemoglobin] = useState('');
    const [diagnosa, setDiagnosa] = useState('');
    const [tindakan, setTindakan] = useState('');
    const [tanggalPeriksa, setTanggalPeriksa] = useState('');
    const [tglHaid, setTglHaid] = useState('');
    const tglSekarang = new Date().toISOString().split('T')[0];
    const [umurKehamilan, setUmurKehamilan] = useState(null);
    const [isAnemia, setIsAnemia] = useState(false);
    const [tanggalPeriksaBerikutnya, setTglPeriksaBerikutnya] = useState('');
    const navigate = useNavigate();
    const CekAnemia = (hb) => {
        let diagnosa = '';
        let tindakan = '';
    
        switch (true) {
            case hb >= 11:
                diagnosa = 'Normal';
                tindakan = 'Obat 1x1 tab';
                break;
            case hb < 11 && hb >= 10:
                diagnosa = 'Anemia Ringan';
                tindakan = 'Obat 1x1 tab';
                break;
            case hb < 10 && hb >= 7:
                diagnosa = 'Anemia Sedang';
                tindakan = 'Obat 2x1 tab';
                break;
            case hb < 7:
                diagnosa = 'Anemia Berat';
                tindakan = 'Dirujuk untuk transfusi darah';
                break;
            default:
                diagnosa = 'Data tidak valid';
                tindakan = 'Periksa kembali nilai hemoglobin';
                break;
        }
    
        return {
            diagnosa,
            tindakan
        };
    }
    const handleHemoglobinChange = (e) => {
        const hb = parseFloat(e.target.value);
        setHemoglobin(hb);

        if (!isNaN(hb)) {
            const hasilCek = CekAnemia(hb);
            setDiagnosa(hasilCek.diagnosa);
            setTindakan(hasilCek.tindakan);
            setIsAnemia(hasilCek.diagnosa.toLowerCase().includes('anemia'));
        } else {
            setDiagnosa('');
            setTindakan('');
            setIsAnemia(false);
        }
    };

    const usiaKehamilan = (tanggalBerjalan, tglHaidTerakhir) =>{
        //const Day = kunjunganDay - haidDay;
        // const Day = Math.round((kunjunganDay - haidDay));
        // const Month = Math.round((kunjunganMonth - haidMonth)*4.33);
        // const HitungUsiaHml = Day + Month;
        // return HitungUsiaHml
        let kunjungan = new Date(tanggalBerjalan);
        let hpht = new Date(tglHaidTerakhir) ;
        let timeDifference = kunjungan - hpht;
       
        // Mengonversi selisih waktu dari milidetik menjadi hari
        let dayDifference = timeDifference / (1000 * 3600 * 24);
    
        // Menghitung usia kehamilan dalam minggu dan hari
        let totalWeeks = Math.floor(dayDifference / 7);
        return setUmurKehamilan(totalWeeks)
    }
    const getTanggalDariUmurKehamilan = (umurKehamilanDalamMinggu, tglHaidTerakhir) => {
        let hpht = new Date(tglHaidTerakhir);
        
        // Mengonversi minggu ke hari
        let daysToAdd = umurKehamilanDalamMinggu * 7;
        
        // Menambahkan hari ke tanggal HPHT
        let tanggalKehamilan = new Date(hpht);
        tanggalKehamilan.setDate(tanggalKehamilan.getDate() + daysToAdd);
    
        return tanggalKehamilan;
    }
    
    const getTanggalPeriksaBerikutnya = (umurKehamilan, tglHaidTerakhir, diagnosaAnemia) => {
        let hpht = new Date(tglHaidTerakhir);
        let tanggalPeriksaBerikutnya;
    
        if (umurKehamilan < 20) {
            if (diagnosaAnemia) {
                let hariIni = new Date();
                tanggalPeriksaBerikutnya = new Date(hariIni.setMonth(hariIni.getMonth() + 1));
            } else {
                tanggalPeriksaBerikutnya = getTanggalDariUmurKehamilan(28, tglHaidTerakhir);
            }
        } else if (umurKehamilan >= 21 && umurKehamilan <= 27) {
            if (diagnosaAnemia) {
                let hariIni = new Date();
                tanggalPeriksaBerikutnya = new Date(hariIni.setMonth(hariIni.getMonth() + 1));
            } else {
                tanggalPeriksaBerikutnya = getTanggalDariUmurKehamilan(32, tglHaidTerakhir);
            }
        } else if (umurKehamilan >= 28) {
            // Jika ditemukan anemia dari awal, periksa sebulan setelahnya
            if (diagnosaAnemia) {
                let hariIni = new Date();
                tanggalPeriksaBerikutnya = new Date(hariIni.setMonth(hariIni.getMonth() + 1));
            } else {
                // Jika tidak ditemukan anemia, periksa sebulan setelahnya
                let hariIni = new Date();
                tanggalPeriksaBerikutnya = new Date(hariIni.setMonth(hariIni.getMonth() + 1));
            }
        }
    
        return tanggalPeriksaBerikutnya;
    }

    useEffect(() => {
        getCurrentIdentitas((data) => {
           setTglHaid(data.data.tgl_haid_terakhir);
        })
        usiaKehamilan(tglSekarang, tglHaid);
 
        if (umurKehamilan !== null) {
            const nextCheckDate = getTanggalPeriksaBerikutnya(umurKehamilan, tglHaid, isAnemia);
            
            // Pastikan nextCheckDate adalah objek Date yang valid
            if (nextCheckDate instanceof Date && !isNaN(nextCheckDate)) {
                setTglPeriksaBerikutnya(nextCheckDate.toISOString().split('T')[0]);
            } else {
                console.error('Tanggal periksa berikutnya tidak valid:', nextCheckDate);
                setTglPeriksaBerikutnya(''); // Atur tanggal periksa ke string kosong jika tidak valid
            }
        }
    },[umurKehamilan, tglSekarang, tglHaid, isAnemia]);
    console.log(sessionStorage.getItem('identitas_id'))
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const token = localStorage.getItem('token');
        formData.append('identitas_id', sessionStorage.getItem('identitas_id'));
        formData.append('tanggal_periksa', tanggalPeriksa);
        formData.append('hemoglobin', hemoglobin);
        formData.append('tgl_periksa_berikutnya', tanggalPeriksaBerikutnya);
        formData.append('diagnosa_anemia', diagnosa);
        formData.append('tindakan', tindakan);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            await axios.post(`${import.meta.env.VITE_REACT_API_URL}/pemeriksaan`, formData);
            navigate('/checkup', { replace: true, state: {
                hemoglobin,
                diagnosa,
                tindakan,
                tanggalPeriksaBerikutnya,
            } });
           
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <LayoutPage>
            <div className="w-full min-h-[80vh] border lg:grid lg:grid-cols-2 lg:items-center border-gray-400">
                <div className="box-border flex overflow-hidden rounded-b-xl lg:rounded-lg lg:bg-gray-50">
                    <img src={anemia} className="object-contain w-full h-full" alt="Anemia Illustration" />
                </div>
                <div className="flex w-full p-4">
                   <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="border">
                        <label className="text-lg label label-text">Tanggal Pemeriksaan</label>
                        <input type="date"
                        value={tanggalPeriksa}
                        onChange={(e) => setTanggalPeriksa(e.target.value)}s
                        className="w-full input input-bordered" />
                    </div>
                    <div className="border">
                        <label className="text-lg label label-text">Hemoglobin</label>
                        <div className="join">
                            <input 
                                type="number" 
                                className="w-full input input-bordered join-item" 
                                value={hemoglobin}
                                onChange={handleHemoglobinChange}
                            />
                            <span className="text-black btn btn-disabled join-item rounded-r-xl">mg/dl</span>
                        </div>
                    </div>
                    <div className="hidden border">
                        <label className="text-lg label label-text">Diagnosa Anemia</label>
                        <input 
                            type="text" 
                            className="w-full input input-bordered" 
                            value={diagnosa}
                            readOnly 
                        />
                    </div>
                    <div className="hidden border">
                        <label className="text-lg label label-text">Tindakan</label>
                        <input 
                            type="text" 
                            className="w-full input input-bordered" 
                            value={tindakan}
                            readOnly 
                        />
                    </div>
                    <div className="border">
                        <label className="text-lg label label-text">Periksa Berikutnya</label>
                         <input 
                            type="date" 
                            className="w-full input input-bordered" 
                            value={tanggalPeriksaBerikutnya}
                            readOnly 
                        />
                    </div>
                    <Button className="bg-[#F4716A] w-full">Simpan</Button>
                   </form>
                </div>
            </div>
        </LayoutPage>
        </>
    )
}

export default PemeriksaanAdd