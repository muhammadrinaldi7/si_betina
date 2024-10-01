import LayoutPage from "../Layout/LayoutPage"
import PregantTogether from "../../assets/imgpr.png"
import { useEffect, useState } from "react";
import axios from "axios";
import imgBaby from "../../assets/janin.png"
import { useNavigate } from "react-router";
import { Trimesteraccordion } from "../Accordion/TrimesterAccordion";
import nasi from "../../assets/nasi.png";
import kentang from "../../assets/kentang.png";
import jagung from "../../assets/jagung.png";
import roti from "../../assets/roti.png";
import mie from "../../assets/mie.png";
import gula from "../../assets/gula.png";
import ikan from "../../assets/ikan.png";
import telur from "../../assets/telur.png";
import tempe from "../../assets/tempe.png";
import tahu from "../../assets/tahu.png";
import sayur from "../../assets/sayur.png";
import pisang from "../../assets/pisang.png";
import pepaya from "../../assets/pepaya.png";


const Index = () => {
  const dateNow = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('user_id')
  const [pendidikan, setPendidikan] = useState("")
  const [namaSuami, setNamaSuami] = useState("")
  const [noTelp, setNoTelp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [tglKunjungan, setTglKunjungan] = useState(dateNow);
  const [tglHaidTerakhir,setTglHaidTerakhir] = useState("");
  const [umurKehamilan, setUmurKehamilan] = useState(null);
  const [tafsiranKehamilan, setTafsiranKehamilan] = useState("");
  const [trimester, setTrimester] = useState("");
  const [kehamilanKe, setKehamilanKe] = useState("");
  const [anakHidup, setAnakHidup] = useState("");
  const [anakMeninggal, setAnakMeninggal] = useState("");
  const [riwayatKeguguran, setRiwayatKeguguran] = useState("");
  const [error, setError] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const token = localStorage.getItem('token')
  const [identitasUser, setIdentitasUser] = useState(null)
  const [weekPregancy, setWeekPregancy] = useState(0) 
  const [loading, setLoading] = useState(false);
 // console.log(pendidikan+" "+namaSuami+" "+noTelp+" "+alamat+" "+tglKunjungan+" "+tglHaidTerakhir+" "+umurKehamilan+" "+tafsiranKehamilan+" "+trimester+" "+kehamilanKe+" "+anakHidup+" "+anakMeninggal+" "+riwayatKeguguran)
  const usiaKehamilan = (tglKunjungan, tglHaidTerakhir) =>{
    //const Day = kunjunganDay - haidDay;
    // const Day = Math.round((kunjunganDay - haidDay));
    // const Month = Math.round((kunjunganMonth - haidMonth)*4.33);
    // const HitungUsiaHml = Day + Month;
    // return HitungUsiaHml
    let kunjungan = new Date(tglKunjungan);
    let hpht = new Date(tglHaidTerakhir) ;
    let timeDifference = kunjungan - hpht;
   
    // Mengonversi selisih waktu dari milidetik menjadi hari
    let dayDifference = timeDifference / (1000 * 3600 * 24);

    // Menghitung usia kehamilan dalam minggu dan hari
    let totalWeeks = Math.floor(dayDifference / 7);
    return totalWeeks
  }

  const taksiranPersalinan = (dayH, monthH, yearH) => {
    let hitungHari = (dayH+7) % 31;
    let day = hitungHari === 0 ? 31 : hitungHari;
    let month = (monthH-3) === 0 ? 12 : (monthH-3) === -1 ? 11 : (monthH-3) === -2 ? 10 : (monthH-3)
    let year = ((monthH===3 && dayH>=25)||(monthH>=4 && monthH<=12)) ? yearH+1 : yearH
    let monthConv = dayH > 22 ? month+1 : month
    let dayStr = day.toString().padStart(2, '0');
    let monthStr = monthConv.toString().padStart(2, '0');
    let yearStr = year;
    
    // Menggabungkan menjadi string tanggal
    let resultDate = [dayStr, monthStr, yearStr].reverse().join('-');
    return resultDate
  }
  
  const trimesterKehamilan = (umurKehamilan) => {
    let trim = 0;
    if(umurKehamilan>0 && umurKehamilan<=12){
      trim = 1
    }else if(umurKehamilan>12 && umurKehamilan<=27){
      trim = 2
    }else if(umurKehamilan>27){
      trim = 3
    }else{
      trim = 0
    }
    return trim
  }

//   function calculateWeeksBetween() {
//     // Mengonversi string tanggal menjadi objek Date
//     const startDate = new Date(dateA);
//     const endDate = new Date(dateB);

//     // Menghitung perbedaan waktu dalam milidetik
//     const timeDifference = Math.abs(endDate - startDate);

//     // Menghitung jumlah minggu
//     const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
//     const weeksDifference = Math.floor(timeDifference / millisecondsInWeek);

//     return setWeekPregancy(weeksDifference);
// }
  // console.log('Tanggal Haid Terakhir :'+tglHaidTerakhir)
  // console.log('tanggal kunjungan :'+tglKunjungan)
  // console.log('Umur kehamilan: '+umurKehamilan)
  useEffect(() => {
    if (!identitasUser) {
        getIdentitasUser();
    }
}, [identitasUser]);
const getIdentitasUser = async () => {
  setLoading(true);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/dataKehamilan/${userId}`);
      setIdentitasUser(response.data.data);
      setTglHaidTerakhir(response.data.data.tgl_haid_terakhir);
      // Setelah data di-set, tidak perlu langsung memanggil fungsi lain, biarkan useEffect mengurusnya
      if(response.data.data == 404){
          setDataReady(false);
      }else{
          setDataReady(true);
      }
  } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setDataReady(false);
  } finally {
      setLoading(false);
  }
}
 
// console.log(identitasUser)
 
   //console.log(tglHaidTerakhir);
  const TrimesterSteps = ({ trimester }) => {
    return (
      <ul className="w-full steps">
        <li className={`step ${trimester === 1 ? 'step-secondary' : ''}`}>Trimester I</li>
        <li className={`step ${trimester === 2 ? 'step-secondary' : ''}`}>Trimester II</li>
        <li className={`step ${trimester === 3 ? 'step-secondary' : ''}`}>Trimester III</li>
      </ul>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('pendidikan', pendidikan);
    formData.append('nama_suami', namaSuami);
    formData.append('alamat', alamat);
    formData.append('no_telp', noTelp);
    // formData.append('tgl_kunjungan', tglKunjungan);
    formData.append('tgl_haid_terakhir', tglHaidTerakhir);
    formData.append('umur_kehamilan', umurKehamilan);
    formData.append('tafsiran_kehamilan', tafsiranKehamilan);
    formData.append('kehamilan_ke', kehamilanKe);
    formData.append('anak_hidup', anakHidup);
    formData.append('anak_meninggal', anakMeninggal);
    formData.append('riwayat_keguguran', riwayatKeguguran);
    formData.append('trimester', trimester);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post(`${import.meta.env.VITE_REACT_API_URL}/identitas`, formData).then(()=>{
        // console.log('berhasil daftar');
        sessionStorage.setItem('identityAddSuccess', 'true');
        navigate("/homepage", { replace: true });
    }).catch(err => {
        setError(err.response.data);
    })
  }
  trimesterKehamilan(umurKehamilan);
  
  const handleSelesaiKehamilan = async (id) => {
    const confirmSelesai = window.confirm('Apakah Anda Ingin Menyelesaikan Masa Kehamilan?');
    if (confirmSelesai) {
      try {
        // Set token authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        
        // Hit API Laravel untuk mengakhiri masa kehamilan
        const response = await axios.put(`${import.meta.env.VITE_REACT_API_URL}/akhiriMasaKehamilan/${id}`);
        
        // Cek response dari API
        if (response.data.success) {
          alert(response.data.message);
          // Redirect ke halaman homepage
          navigate("/homepage", { replace: true });
        } else {
          alert('Gagal menyelesaikan masa kehamilan: ' + response.data.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan saat mengakhiri masa kehamilan:', error);
        alert('Terjadi kesalahan saat mengakhiri masa kehamilan.');
      }
    } else {
      // Jika user membatalkan konfirmasi
      return;
    }
  };

  // console.log(identitasUser)
    useEffect(() => {
      // Cek jika tglHaidTerakhir dan tglKunjungan sudah ada
      if (tglHaidTerakhir) {
          // Update umur kehamilan berdasarkan tglHaidTerakhir
          const updatedUmurKehamilan = usiaKehamilan(tglKunjungan, tglHaidTerakhir);
          setUmurKehamilan(updatedUmurKehamilan);

          // Update tafsiran persalinan berdasarkan tglHaidTerakhir
          const updatedTafsiranKehamilan = taksiranPersalinan(
              parseInt(tglHaidTerakhir.split('-')[2]), // Hari
              parseInt(tglHaidTerakhir.split('-')[1]), // Bulan
              parseInt(tglHaidTerakhir.split('-')[0])  // Tahun
          );
          setTafsiranKehamilan(updatedTafsiranKehamilan);

          // Update trimester kehamilan berdasarkan umur kehamilan yang sudah dihitung
          const updatedTrimester = trimesterKehamilan(updatedUmurKehamilan);
          setTrimester(updatedTrimester);
          
      }
  }, [tglHaidTerakhir, tglKunjungan]);
console.log(identitasUser);
if (loading) {
  return (
      <div className="splash-screen">
          <h1>Loading...</h1>
          {/* Anda bisa menambahkan animasi atau gambar di sini */}
      </div>
  );
}
    return (
        <LayoutPage>
          <section className="bg-gray-100">
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-6">
              {!dataReady ? (
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="text-center lg:col-span-2 lg:py-12 lg:mt-32 ">
                  <img src={PregantTogether} className="block mx-auto" alt="" />
                  <a href="#" className="text-2xl font-bold text-pink-600"> Lengkapi Data Diri </a>
                </div>
                <div className="p-8 bg-white rounded-lg shadow-lg lg:col-span-3 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="pendidikan">Pendidikan</label>
                      <input
                        className="w-full p-3 text-sm border-gray-200 rounded-lg"
                        placeholder="Pendidikan Ibu"
                        type="text"
                        value={pendidikan}
                        onChange={(e) => setPendidikan(e.target.value)}
                        id="pendidikan"
                      />
                    </div>
                    {
                    error.pendidikan &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.pendidikan[0]}</span>
                            </div>
                    )
                    }
                    <div>
                        <label className="sr-only" htmlFor="nama_suami">Nama Suami</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Nama Suami"
                          type="nama_suami"
                          value={namaSuami}
                          onChange={(e) => setNamaSuami(e.target.value)}
                          id="nama_suami"
                        />
                    </div>
                    {
                    error.nama_suami &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.nama_suami[0]}</span>
                            </div>
                    )
                    }
                    </div>
                      <div>
                        <label className="sr-only" htmlFor="nama_suami">No Telpon</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Nomor Telpon"
                          type="nama_suami"
                          value={noTelp}
                          onChange={(e) => setNoTelp(e.target.value)}
                          id="nama_suami"
                        />
                      </div>
                          {
                        error.no_telp &&(
                            <div role="alert" className="mt-0 text-sm alert alert-error">
                                <span>{error.no_telp[0]}</span>
                                </div>
                        )
                        }
                      <div>
                        <label className="sr-only" htmlFor="alamat">Alamat</label>
                        <textarea
                        className="w-full p-3 text-sm border-gray-200 rounded-lg"
                        placeholder="Alamat"
                        rows="3"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        id="alamat"
                      ></textarea>
                      </div>
                      {
                    error.alamat &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.alamat[0]}</span>
                            </div>
                    )
                    }
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="" htmlFor="tgl_kunjungan">Tanggal Kunjungan Pertama</label> <br />
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Tanggal Pertama"
                          type="date"
                          value={tglKunjungan}
                          onChange={(e) => setTglKunjungan(e.target.value)}
                          id="tgl_kunjungan"
                        />
                      </div>
                      <div>
                        <label className="" htmlFor="tgl_haid_terakhir">Tanggal Haid Terakhir</label> <br />
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Tanggal Haid Terakhir"
                          type="date"
                          value={tglHaidTerakhir}
                          onChange={(e) => setTglHaidTerakhir(e.target.value)}
                          id="tgl_haid_terakhir"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="" htmlFor="umur_kehamilan">Umur Kehamilan</label> <br />
                        <input
                          className="w-[40px] rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Dalam Minggu"
                          type="text"
                          value={umurKehamilan}
                          onChange={(e) => setUmurKehamilan(e.target.value)}
                          readOnly
                          id="umur_kehamilan"
                        /> <span> Minggu</span>
                      </div>
                      <div>
                        <label className="" htmlFor="nama_suami">Taksiran Persalinan</label> <br />
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Taksiran Persalinan"
                          type="date"
                        
                          value={tafsiranKehamilan}
                         
                          id="tafsiran_kelahiran"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="col-span-2 text-center ">
                        <label className="" htmlFor="trimester">Trimester</label>
                        <input
                          className="hidden w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Trimester"
                          type="text"
                          value={trimester}
                          onChange={(e) => setTrimester(e.target.value)}
                          id="trimester"
                        />
                        <div className="w-full">
                          <TrimesterSteps trimester={trimester} />
                        </div>
                      </div>
                    </div>


                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" htmlFor="kehamilan_ke">Kehamilan Ke</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Kehamilan Ke"
                          type="number"
                          value={kehamilanKe}
                          onChange={(e) => setKehamilanKe(e.target.value)}
                          id="kehamilan_ke"
                        />
                      </div>
                      {
                    error.kehamilan_ke &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.kehamilan_ke[0]}</span>
                            </div>
                    )
                    }
                      <div>
                        <label className="sr-only" htmlFor="anak_hidup">Anak Hidup</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Anak Hidup"
                          type="number"
                          value={anakHidup}
                          onChange={(e) => setAnakHidup(e.target.value)}
                          id="anak_hidup"
                        />
                      </div>
                      {
                    error.anak_hidup &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.anak_hidup[0]}</span>
                            </div>
                    )
                    }
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" htmlFor="anak_meninggal">Anak Meninggal</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Anak Meninggal"
                          type="number"
                          value={anakMeninggal}
                          onChange={(e) => setAnakMeninggal(e.target.value)}
                          id="anak_meninggal"
                        />
                      </div>
                      {
                    error.anak_hidup &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.anak_hidup[0]}</span>
                            </div>
                    )
                    }
                      <div>
                        <label className="sr-only" htmlFor="riwayat_keguguran">Riwayat Keguguran</label>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Riwayat Keguguran"
                          type="number"
                          value={riwayatKeguguran}
                          onChange={(e) => setRiwayatKeguguran(e.target.value)}
                          id="riwayat_keguguran"
                        />
                      </div>
                      {
                    error.riwayat_keguguran &&(
                        <div role="alert" className="mt-0 text-sm alert alert-error">
                            <span>{error.riwayat_keguguran[0]}</span>
                            </div>
                    )
                    }
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-block w-full px-5 py-3 font-medium text-white bg-pink-400 rounded-lg sm:w-auto"
                      >
                        Kirim Data
                      </button>
                    </div>
                  </form>
                </div>
              </div>):(
              <div className="w-full border">
                  <div className="relative block p-4 overflow-hidden border border-gray-100 rounded-lg sm:p-6 lg:p-8">
                    <span
                      className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                          Ibu. {identitasUser.user.nama} 
                        <span className="mt-1 ml-4 text-xs font-medium text-gray-600">/ {identitasUser.user.umur} Tahun</span>
                        </h3>
                      </div>                      
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500 text-pretty">No Telp : {identitasUser.no_telp}</p>
                      <p className="text-sm text-gray-500 text-pretty">Alamat : {identitasUser.alamat}</p>
                    </div>
                    {/* <dl className="flex gap-4 mt-6 sm:gap-6">
                      <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Published</dt>
                        <dd className="text-xs text-gray-500">31st June, 2021</dd>
                      </div>

                      <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                        <dd className="text-xs text-gray-500">3 minute</dd>
                      </div>
                    </dl> */}
                  </div>
                  
                  <div className="w-full mt-4 rounded-t-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                    <p className="pt-2 text-center text-white">Tanggal Haid Terakhir</p>
                    <p className="pb-2 text-center text-white">{identitasUser.tgl_haid_terakhir}</p>
                  </div>
                  <div className="w-full py-4 flex flex-col border justify-center text-center items-center bg-gradient-to-b from-[#FFAB92] to-[#fff6d3]">
                    <div><img src={imgBaby} className="drop-shadow-2xl" alt="" /></div>
                    <div><h1 className="text-xl font-bold text-blue-500">Minggu ke - {umurKehamilan}</h1></div>
                  </div>
                  <div className="w-full rounded-b-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                    <p className="pt-2 text-center text-white">Taksiran Tanggal Persalinan</p>
                    <p className="pb-2 text-center text-white">{identitasUser.tafsiran_kehamilan}</p>
                  </div>
                  <div className="relative block p-4 mt-4 overflow-hidden bg-white rounded-lg sm:p-6 lg:p-8">
                  <TrimesterSteps trimester={trimesterKehamilan(umurKehamilan)}/>
                  </div>
                  <div className="relative block p-4 mt-4 overflow-hidden bg-white rounded-lg sm:p-6 lg:p-8">
                    <Trimesteraccordion judul="Trimester I">
                      <p>(Minggu 1-12): Perkembangan awal, di mana berat dan panjang janin meningkat secara bertahap.
                      </p>
                      <h1 className="text-sm font-bold">Porsi Makanan Ibu Hamil Untuk Kebutuhan Sehari</h1>
                      <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border border-collapse border-gray-300 shadow-lg table-auto">
                        <thead className="text-white bg-blue-500">
                          <tr>
                            <th className="px-4 py-2 border border-gray-300">Bahan Makanan</th>
                            <th className="px-4 py-2 border border-gray-300">Porsi</th>
                            <th className="px-4 py-2 border border-gray-300">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">Nasi/Makanan Pokok</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">5 Porsi
                              <div className="grid items-center w-1/2 lg:grid-cols-3 lg:w-full">
                                <img src={nasi} alt="" />
                                <img src={kentang} alt="" />
                                <img src={mie} alt="" />
                                <img src={roti} alt="" />
                                <img src={jagung} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100g atau 34 gelas nasi</p>
                              <p>1 Porsi : 25g atau 3 buah jagung ukuran sedang</p>
                              <p>1 Porsi : 210g atau 2 kentang ukuran sedang</p>
                              <p>1 Porsi : 70g atau 3 iris roti putih</p>
                              <p>1 Porsi : 200g atau 2 gelas mie basah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Hewani, Ikan, telur, ayam dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={ikan} alt="" />
                                <img src={telur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong ikan sedang</p>
                              <p>1 Porsi : 55g atau 1 butir telur ayam</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Nabati, Tempe, tahu dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={tahu} alt="" />
                                <img src={tempe} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong sedang tempe</p>
                              <p>1 Porsi : 100g atau 2 potong sedang tahu</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Sayur-sayuran</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={sayur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 mangkuk sayur matang tanpa kuah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Buah-buahan</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={pisang} alt="" />
                                <img src={pepaya} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 potong sedang pisang</p>
                              <p>1 Porsi : 100-190gr atau 2 potong besar pepaya</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Minyak/Lemak</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>5 Porsi</p>
                              <p>Minyak/lemak termasuk santan yang digunakan <br /> dalam pengolahan,makanan digoreng, ditumis,<br /> atau dimasak dengan santan.</p>  
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 50gr atau</p>
                              <p>1 sendok teh,bersumber dari pengolahan makanan seperti menggoreng, menumis, santan,kemiri,mentega dan sumber lemak lainnya.</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Gula</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">2 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={gula} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 10gr atau 1 sendok makan bersumber dari kue-kue manis, minuman teh manis dan lainnya.</p>
                              
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="px-4 py-2 border border-gray-300 ">
                              <div className="w-full bg-red-300 btn">
                                <h1>Batasi konsumsi garam hingga 1 sendok teh/hari dan minum air putih 8-12 gelas/hari</h1>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </Trimesteraccordion>
                    <Trimesteraccordion judul="Trimester II">
                      <p>(Minggu 13-27): Perkembangan organ tubuh semakin jelas, dengan peningkatan berat yang signifikan.
                      </p>
                      <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border border-collapse border-gray-300 shadow-lg table-auto">
                        <thead className="text-white bg-blue-500">
                          <tr>
                            <th className="px-4 py-2 border border-gray-300">Bahan Makanan</th>
                            <th className="px-4 py-2 border border-gray-300">Porsi</th>
                            <th className="px-4 py-2 border border-gray-300">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">Nasi/Makanan Pokok</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">5 Porsi
                              <div className="grid items-center w-1/2 lg:grid-cols-3 lg:w-full">
                                <img src={nasi} alt="" />
                                <img src={kentang} alt="" />
                                <img src={mie} alt="" />
                                <img src={roti} alt="" />
                                <img src={jagung} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100g atau 34 gelas nasi</p>
                              <p>1 Porsi : 25g atau 3 buah jagung ukuran sedang</p>
                              <p>1 Porsi : 210g atau 2 kentang ukuran sedang</p>
                              <p>1 Porsi : 120g atau 1 1/2 potong singkong</p>
                              <p>1 Porsi : 70g atau 3 iris roti putih</p>
                              <p>1 Porsi : 200g atau 2 gelas mie basah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Hewani, Ikan, telur, ayam dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={ikan} alt="" />
                                <img src={telur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong ikan sedang</p>
                              <p>1 Porsi : 55g atau 1 butir telur ayam</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Nabati, Tempe, tahu dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={tahu} alt="" />
                                <img src={tempe} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong sedang tempe</p>
                              <p>1 Porsi : 100g atau 2 potong sedang tahu</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Sayur-sayuran</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={sayur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 mangkuk sayur matang tanpa kuah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Buah-buahan</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={pisang} alt="" />
                                <img src={pepaya} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 potong sedang pisang</p>
                              <p>1 Porsi : 100-190gr atau 2 potong besar pepaya</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Minyak/Lemak</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>5 Porsi</p>
                              <p>Minyak/lemak termasuk santan yang digunakan <br /> dalam pengolahan,makanan digoreng, ditumis,<br /> atau dimasak dengan santan.</p>  
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 50gr atau</p>
                              <p>1 sendok teh,bersumber dari pengolahan makanan seperti menggoreng, menumis, santan,kemiri,mentega dan sumber lemak lainnya.</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Gula</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">2 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={gula} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 10gr atau 1 sendok makan bersumber dari kue-kue manis, minuman teh manis dan lainnya.</p>
                              
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="px-4 py-2 border border-gray-300 ">
                              <div className="w-full bg-red-300 btn">
                                <h1>Batasi konsumsi garam hingga 1 sendok teh/hari dan minum air putih 8-12 gelas/hari</h1>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </Trimesteraccordion>
                    <Trimesteraccordion judul={`Trimester III `}>
                      <p>(Minggu 28-40): Pertumbuhan pesat dalam berat badan dan panjang, persiapan menuju kelahiran.
                      </p>
                      <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left border border-collapse border-gray-300 shadow-lg table-auto">
                        <thead className="text-white bg-blue-500">
                          <tr>
                            <th className="px-4 py-2 border border-gray-300">Bahan Makanan</th>
                            <th className="px-4 py-2 border border-gray-300">Porsi</th>
                            <th className="px-4 py-2 border border-gray-300">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody >
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">Nasi/Makanan Pokok</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">5 Porsi
                              <div className="grid items-center w-1/2 lg:grid-cols-3 lg:w-full">
                                <img src={nasi} alt="" />
                                <img src={kentang} alt="" />
                                <img src={mie} alt="" />
                                <img src={roti} alt="" />
                                <img src={jagung} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100g atau 34 gelas nasi</p>
                              <p>1 Porsi : 25g atau 3 buah jagung ukuran sedang</p>
                              <p>1 Porsi : 210g atau 2 kentang ukuran sedang</p>
                              <p>1 Porsi : 120g atau 1 1/2 potong singkong</p>
                              <p>1 Porsi : 70g atau 3 iris roti putih</p>
                              <p>1 Porsi : 200g atau 2 gelas mie basah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Hewani, Ikan, telur, ayam dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={ikan} alt="" />
                                <img src={telur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong ikan sedang</p>
                              <p>1 Porsi : 55g atau 1 butir telur ayam</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Protein Nabati, Tempe, tahu dll</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                              <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={tahu} alt="" />
                                <img src={tempe} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 50gr atau 1 potong sedang tempe</p>
                              <p>1 Porsi : 100g atau 2 potong sedang tahu</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Sayur-sayuran</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={sayur} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 mangkuk sayur matang tanpa kuah</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Buah-buahan</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">4 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={pisang} alt="" />
                                <img src={pepaya} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>1 Porsi : 100gr atau 1 potong sedang pisang</p>
                              <p>1 Porsi : 100-190gr atau 2 potong besar pepaya</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Minyak/Lemak</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">
                              <p>5 Porsi</p>
                              <p>Minyak/lemak termasuk santan yang digunakan <br /> dalam pengolahan,makanan digoreng, ditumis,<br /> atau dimasak dengan santan.</p>  
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 50gr atau</p>
                              <p>1 sendok teh,bersumber dari pengolahan makanan seperti menggoreng, menumis, santan,kemiri,mentega dan sumber lemak lainnya.</p>
                            </td>
                          </tr>
                          <tr className="transition duration-300 bg-gray-100 hover:bg-blue-100">
                            <td className="px-4 py-2 border border-gray-300">Gula</td>
                            <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">2 Porsi
                            <div className="items-center w-1/2 lg:grid lg:grid-cols-3 lg:w-full">
                                <img src={gula} alt="" />
                              </div>
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              <p>1 Porsi : 10gr atau 1 sendok makan bersumber dari kue-kue manis, minuman teh manis dan lainnya.</p>
                              
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="3" className="px-4 py-2 border border-gray-300 ">
                              <div className="w-full bg-red-300 btn">
                                <h1>Batasi konsumsi garam hingga 1 sendok teh/hari dan minum air putih 8-12 gelas/hari</h1>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </Trimesteraccordion>
                  </div>
                  <div className="relative flex flex-col p-4 mt-4 overflow-hidden bg-white rounded-lg sm:p-6 lg:p-8">
                    <button onClick={() =>handleSelesaiKehamilan(identitasUser.id)} className="btn btn-primary">Kehamilan Selesai</button>
                    <p className="text-sm text-left text-gray-500">*Klik Ketika Masa Kehamilan Selesai</p>
                  </div>
              </div>
            )}
            </div>
          </section>
        </LayoutPage>
    )
}

export default Index