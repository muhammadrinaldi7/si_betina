import LayoutPage from "../Layout/LayoutPage"
import PregantTogether from "../../assets/imgpr.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('user_id')
  const [pendidikan, setPendidikan] = useState("")
  const [namaSuami, setNamaSuami] = useState("")
  const [noTelp, setNoTelp] = useState("")
  const [alamat, setAlamat] = useState("")
  const [tglKunjungan, setTglKunjungan] = useState('');
  const [tglHaidTerakhir,setTgkHaidTerakhir] = useState("");
  const [umurKehamilan, setUmurKehamilan] = useState(null);
  const [tafsiranKehamilan, setTafsiranKehamilan] = useState("");
  const [trimester, setTrimester] = useState("");
  const [kehamilanKe, setKehamilanKe] = useState("");
  const [anakHidup, setAnakHidup] = useState("");
  const [anakMeninggal, setAnakMeninggal] = useState("");
  const [riwayatKeguguran, setRiwayatKeguguran] = useState("");
  const kunjunganMonth = parseInt(tglKunjungan.toString().split('T')[0].replace(/-/g, '').slice(4,6));
  const kunjunganDay = parseInt(tglKunjungan.toString().split('T')[0].replace(/-/g, '').slice(6,8));
  const haidYear = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(0,4))
  const haidMonth = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(4,6));
  const haidDay = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(6,8));
  const [error, setError] = useState([]);
  const token = localStorage.getItem('token')
  const [identitasUser, setIdentitasUser] = useState([])

 // console.log(pendidikan+" "+namaSuami+" "+noTelp+" "+alamat+" "+tglKunjungan+" "+tglHaidTerakhir+" "+umurKehamilan+" "+tafsiranKehamilan+" "+trimester+" "+kehamilanKe+" "+anakHidup+" "+anakMeninggal+" "+riwayatKeguguran)
  const usiaKehamilan = () =>{
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

  const taksiranPersalinan = () => {
    let hitungHari = (haidDay+7) % 31;
    let day = hitungHari === 0 ? 31 : hitungHari;
    let month = (haidMonth-3) === 0 ? 12 : (haidMonth-3) === -1 ? 11 : (haidMonth-3) === -2 ? 10 : (haidMonth-3)
    let year = ((haidMonth===3 && haidDay>=25)||(haidMonth>=4 && haidMonth<=12)) ? haidYear+1 : haidYear
    let dayStr = day.toString().padStart(2, '0');
    let monthStr = month.toString().padStart(2, '0');
    let yearStr = year.toString();

    // Menggabungkan menjadi string tanggal
    let resultDate = [dayStr, monthStr, yearStr].reverse().join('-');
    return resultDate
  }

  const trimesterKehamilan = () => {
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
  // console.log('Tanggal Haid Terakhir :'+tglHaidTerakhir)
  // console.log('tanggal kunjungan :'+tglKunjungan)
  // console.log('Umur kehamilan: '+umurKehamilan)

  const getIdentitasUser = async (e) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.get(`${import.meta.env.VITE_REACT_API_URL}/identitas/${userId}`)
    .then((response) => {
      setIdentitasUser(response.data.data)
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
  }
   console.log(identitasUser)
  const TrimesterSteps = ({ trimester }) => {
    return (
      <ul className="steps w-full">
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
        console.log('berhasil daftar');
        sessionStorage.setItem('identityAddSuccess', 'true');
        navigate("/homepage", { replace: true });
    }).catch(err => {
        setError(err.response.data.message);
    })
  }

  useEffect(() => {
    if (tglHaidTerakhir) {
      setUmurKehamilan(usiaKehamilan());
      setTafsiranKehamilan(taksiranPersalinan());
      setTrimester(trimesterKehamilan());
    }
    getIdentitasUser();
  }, [tglKunjungan, tglHaidTerakhir, umurKehamilan]);


    return (
        <LayoutPage>
          <section className="bg-gray-100">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                <div className="lg:col-span-2 lg:py-12 text-center ">
                  <img src={PregantTogether} className="mx-auto block" alt="" />
                  <a href="#" className="text-2xl font-bold text-pink-600"> Lengkapi Data Diri </a>
                </div>
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="sr-only" htmlFor="name">Pendidikan</label>
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Pendidikan Ibu"
                        type="text"
                        value={pendidikan}
                        onChange={(e) => setPendidikan(e.target.value)}
                        id="pendidikan"
                      />
                    </div>
                    <div>
                        <label className="sr-only" htmlFor="nama_suami">Nama Suami</label>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Nama Suami"
                          type="nama_suami"
                          value={namaSuami}
                          onChange={(e) => setNamaSuami(e.target.value)}
                          id="nama_suami"
                        />
                      </div>
                    </div>
                      <div>
                        <label className="sr-only" htmlFor="nama_suami">No Telpon</label>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Nomor Telpon"
                          type="nama_suami"
                          value={noTelp}
                          onChange={(e) => setNoTelp(e.target.value)}
                          id="nama_suami"
                        />
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="alamat">Alamat</label>
                        <textarea
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Alamat"
                        rows="3"
                        value={alamat}
                        onChange={(e) => setAlamat(e.target.value)}
                        id="alamat"
                      ></textarea>
                      </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="" htmlFor="tgl_kunjungan">Tanggal Kunjungan Pertama</label> <br />
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
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
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Tanggal Haid Terakhir"
                          type="date"
                          value={tglHaidTerakhir}
                          onChange={(e) => setTgkHaidTerakhir(e.target.value)}
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
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Taksiran Persalinan"
                          type="date"
                        
                          value={tafsiranKehamilan}
                          onChange={(e) => setTafsiranKehamilan(e.target.value)}
                          id="tafsiran_kelahiran"
                        />
                      </div>
                    </div>
                    <div className="grid  grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="text-center col-span-2 ">
                        <label className="" htmlFor="trimester">Trimester</label>
                        <input
                          className="w-full hidden rounded-lg border-gray-200 p-3 text-sm"
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
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Kehamilan Ke"
                          type="number"
                          value={kehamilanKe}
                          onChange={(e) => setKehamilanKe(e.target.value)}
                          id="kehamilan_ke"
                        />
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="anak_hidup">Anak Hidup</label>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Anak Hidup"
                          type="number"
                          value={anakHidup}
                          onChange={(e) => setAnakHidup(e.target.value)}
                          id="anak_hidup"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="sr-only" htmlFor="anak_meninggal">Anak Meninggal</label>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Anak Meninggal"
                          type="number"
                          value={anakMeninggal}
                          onChange={(e) => setAnakMeninggal(e.target.value)}
                          id="anak_meninggal"
                        />
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="riwayat_keguguran">Riwayat Keguguran</label>
                        <input
                          className="w-full rounded-lg border-gray-200 p-3 text-sm"
                          placeholder="Riwayat Keguguran"
                          type="number"
                          value={riwayatKeguguran}
                          onChange={(e) => setRiwayatKeguguran(e.target.value)}
                          id="riwayat_keguguran"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-block w-full rounded-lg bg-pink-400 px-5 py-3 font-medium text-white sm:w-auto"
                      >
                        Kirim Data
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </LayoutPage>
    )
}

export default Index