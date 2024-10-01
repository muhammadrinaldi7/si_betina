import LayoutPage from "../../../Layout/LayoutPage";
import { useParams } from 'react-router';
import { getDetailIdentitas, getIdentitas } from "../../../Service/identitas.service";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateData = () => {
    const id = useParams().id;
    const [kehamilan, setKehamilan] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault();
        setKehamilan({ ...kehamilan, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        getDetailIdentitas(id, (data) => {
            setKehamilan(data.data);
        })
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.put(`${import.meta.env.VITE_REACT_API_URL}/identitas/${id}`, kehamilan).then((response) => {
            console.log(response);
            navigate("/dashboard/", { replace: true });
        }).catch((error) => {
            console.log(error);
        });
    }
    console.log(kehamilan)
    return (
        <>
         <LayoutPage>
      <div className="w-full p-2">
        <div className="grid h-20 card bg-secondary-content rounded-box place-items-center">
          <h1 className="text-2xl font-bold">Ubah Data Kehamilan</h1>
        </div>
        <div className="divider"></div>
        <div className="overflow-x-auto rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pendidikan">Pendidikan Ibu</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Pendidikan Ibu"
                  type="text"
                  value={kehamilan.pendidikan}
                  onChange={(e) => setKehamilan({ ...kehamilan, pendidikan: e.target.value })}
                  id="pendidikan"
                />
              </div>
              <div>
                <label htmlFor="nama_suami">Nama Suami</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Nama Suami"
                  type="text"
                  value={kehamilan.nama_suami}
                  onChange={(e) => setKehamilan({ ...kehamilan, nama_suami: e.target.value })}
                  id="nama_suami"
                />
              </div>
            </div>
            <div>
              <label htmlFor="no_telp">No Telepon</label>
              <input
                className="w-full p-3 text-sm border-gray-200 rounded-lg"
                placeholder="Nomor Telepon"
                type="text"
                value={kehamilan.no_telp}
                onChange={(e) => setKehamilan({ ...kehamilan, no_telp: e.target.value })}
                id="no_telp"
              />
            </div>
            <div>
              <label htmlFor="alamat">Alamat</label>
              <textarea
                className="w-full p-3 text-sm border-gray-200 rounded-lg"
                placeholder="Alamat"
                rows="3"
                value={kehamilan.alamat}
                onChange={(e) => setKehamilan({ ...kehamilan, alamat: e.target.value })}
                id="alamat"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tgl_haid_terakhir">Tanggal Haid Terakhir</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Tanggal Haid Terakhir"
                  type="date"
                  value={kehamilan.tgl_haid_terakhir}
                  onChange={(e) => setKehamilan({ ...kehamilan, tgl_haid_terakhir: e.target.value })}
                  id="tgl_haid_terakhir"
                />
              </div>
              <div>
                <label htmlFor="tafsiran_kehamilan">Taksiran Persalinan</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Taksiran Persalinan"
                  type="date"
                  value={kehamilan.tafsiran_kehamilan}
                  onChange={(e) => setKehamilan({ ...kehamilan, tafsiran_kehamilan: e.target.value })}
                  id="tafsiran_kehamilan"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label htmlFor="umur_kehamilan">Umur Kehamilan</label> <br />
                <input
                  className="w-[100px] p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Dalam Minggu"
                  type="text"
                  value={kehamilan.umur_kehamilan}
                  onChange={(e) => setKehamilan({ ...kehamilan, umur_kehamilan: e.target.value })}
                  readOnly
                  id="umur_kehamilan"
                /> <span> Minggu</span>
              </div>
              <div>
                <label htmlFor="trimester">Trimester</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Trimester"
                  type="text"
                  value={kehamilan.trimester}
                  onChange={(e) => setKehamilan({ ...kehamilan, trimester: e.target.value })}
                  id="trimester"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="kehamilan_ke">Kehamilan Ke</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Kehamilan Ke"
                  type="number"
                  value={kehamilan.kehamilan_ke}
                  onChange={(e) => setKehamilan({ ...kehamilan, kehamilan_ke: e.target.value })}
                  id="kehamilan_ke"
                />
              </div>
              <div>
                <label htmlFor="anak_hidup">Anak Hidup</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Anak Hidup"
                  type="number"
                  value={kehamilan.anak_hidup}
                  onChange={(e) => setKehamilan({ ...kehamilan, anak_hidup: e.target.value })}
                  id="anak_hidup"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="anak_meninggal">Anak Meninggal</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Anak Meninggal"
                  type="number"
                  value={kehamilan.anak_meninggal}
                  onChange={(e) => setKehamilan({ ...kehamilan, anak_meninggal: e.target.value })}
                  id="anak_meninggal"
                />
              </div>
              <div>
                <label htmlFor="riwayat_keguguran">Riwayat Keguguran</label>
                <input
                  className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  placeholder="Riwayat Keguguran"
                  type="number"
                  value={kehamilan.riwayat_keguguran}
                  onChange={(e) => setKehamilan({ ...kehamilan, riwayat_keguguran: e.target.value })}
                  id="riwayat_keguguran"
                />
              </div>
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
      </div>
    </LayoutPage>
        </>
    );
};

export default UpdateData;