import LayoutPage from "../Layout/LayoutPage"
import PregantTogether from "../../assets/imgpr.png"
import { useEffect, useState } from "react";

const Index = () => {
  const hari = '2021-07-14'
  const [tglKunjungan, setTglKunjungan] = useState(hari);
  const [tglHaidTerakhir,setTgkHaidTerakhir] = useState("");
  const [umurKehamilan, setUmurKehamilan] = useState(null);
  const [tafsiranKehamilan, setTafsiranKehamilan] = useState("");
  const [trimester, setTrimester] = useState("");
  const kunjunganMonth = parseInt(tglKunjungan.toString().split('T')[0].replace(/-/g, '').slice(4,6));
  const kunjunganDay = parseInt(tglKunjungan.toString().split('T')[0].replace(/-/g, '').slice(6,8));
  const haidYear = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(0,4))
  const haidMonth = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(4,6));
  const haidDay = parseInt(tglHaidTerakhir.toString().split('T')[0].replace(/-/g, '').slice(6,8));

  const usiaKehamilan = () =>{
    //const Day = kunjunganDay - haidDay;
    const Day = Math.round((kunjunganDay - haidDay)/7);
    const Month = Math.round((kunjunganMonth - haidMonth)*4.33);
    const HitungUsiaHml = Day + Month;
    return HitungUsiaHml
  }

  const taksiranPersalinan = () => {
    let day = haidDay+7;
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
    }else if(umurKehamilan>27 && umurKehamilan<=40){
      trim = 3
    }else{
      trim = 0
    }
    return trim
  }

  const TrimesterSteps = ({ trimester }) => {
    return (
      <ul className="steps">
        <li className={`step ${trimester === 1 ? 'step-primary' : ''}`}>Trimester I</li>
        <li className={`step ${trimester === 2 ? 'step-primary' : ''}`}>Trimester II</li>
        <li className={`step ${trimester === 3 ? 'step-primary' : ''}`}>Trimester III</li>
      </ul>
    );
  }

  useEffect(() => {
    if (tglHaidTerakhir) {
      setUmurKehamilan(usiaKehamilan());
      setTafsiranKehamilan(taksiranPersalinan());
      setTrimester(trimesterKehamilan());
    }
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
        <form action="#" className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="sr-only" htmlFor="name">Pendidikan</label>
            <input
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Pendidikan Ibu"
              type="text"
              id="pendidikan"
            />
          </div>
          <div>
              <label className="sr-only" htmlFor="nama_suami">Nama Suami</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Nama Suami"
                type="nama_suami"
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
                id="nama_suami"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="alamat">Alamat</label>
              <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Alamat"
              rows="8"
              id="alamat"
            ></textarea>
            </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

            <div>
              <label className="" htmlFor="umur_kehamilan">Umur Kehamilan</label> <br />
              <input
                className="w-[40px] rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Dalam Minggu"
                type="text"
                value={umurKehamilan}
                readOnly
                id="umur_kehamilan"
              /> <span> Minggu</span>
            </div>
           
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="" htmlFor="nama_suami">Taksiran Persalinan</label> <br />
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Taksiran Persalinan"
                type="date"
                value={tafsiranKehamilan}
                id="tafsiran_kelahiran"
              />
            </div>

            <div>
              <label className="" htmlFor="trimester">Trimester</label>
              <input
                className="w-full hidden rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Trimester"
                type="text"
                value={trimester}
                id="trimester"
              />
              <div>
                <TrimesterSteps trimester={trimester} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="nama_suami">Nama Suami</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Nama Suami"
                type="date"
                id="nama_suami"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="alamat">Alamat</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Alamat"
                type="text"
                id="alamat"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="sr-only" htmlFor="nama_suami">Nama Suami</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Nama Suami"
                type="nama_suami"
                id="nama_suami"
              />
            </div>

            <div>
              <label className="sr-only" htmlFor="alamat">Alamat</label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                placeholder="Alamat"
                type="text"
                id="alamat"
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="message">Message</label>

            <textarea
              className="w-full rounded-lg border-gray-200 p-3 text-sm"
              placeholder="Message"
              rows="8"
              id="message"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Send Enquiry
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