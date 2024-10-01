import React, { useState, useEffect } from 'react';
import LayoutPage from '../../Layout/LayoutPage';
import { getUsersAll } from '../../Service/usersAll.service';
import { useParams } from 'react-router';
import { getDetailUser } from '../../Service/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeDropper, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EditUser = () => {
    const id = useParams().id;
    const [users, setUsers] = useState([]);

    const [showPassword,setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    useEffect(() => {
        getDetailUser(id, (data) => {
            setUsers(data.data);
        })
    }, []);
    function hitungUmur(tanggalLahir) {
        const today = new Date(); // Tanggal hari ini
        const birthDate = new Date(tanggalLahir); // Konversi input tanggal lahir ke format Date
        let umur = today.getFullYear() - birthDate.getFullYear(); // Selisih tahun
      
        // Cek apakah sudah melewati ulang tahun pada tahun ini
        const bulan = today.getMonth() - birthDate.getMonth();
        if (bulan < 0 || (bulan === 0 && today.getDate() < birthDate.getDate())) {
          umur--; // Jika belum melewati ulang tahun, kurangi umur
        }
      
        return umur;
      }
      
    const handleChange = (e) => {
        e.preventDefault();
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    console.log(users)
    return (
        <>
        <LayoutPage>
        <div className="w-full h-full p-2">
        <div className="flex flex-col w-full">
            <div className="grid h-20 bg-white card rounded-box place-items-center"><h1 className="text-2xl font-bold">Edit Pengguna</h1></div>
            <div className="divider"></div>
            <div className="p-8 bg-white rounded-lg shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">Name</label>
            <input
              className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
              placeholder="Name"
              type="text"
              name="name"
              onChange={handleChange}
              value={users?.nama}
              id="name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* <div>
              <label className="sr-only" htmlFor="NIK">NIK</label>
              <input
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                placeholder="NIK"
                type="number"
                name="nik"
                onChange={handleChange}
                value={users?.nik}
                id="nik"
              />
            </div> */}

            <div>
              <label className="sr-only" htmlFor="tglLahir">Tanggal Lahir</label>
              <input
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                placeholder="Tanggal Lahir"
                type="date"
                name="tgl_lahir"
                onChange={handleChange}
                value={users?.tgl_lahir}
                id="tglLahir"
              />
            </div>
            <div>
            <label for="password" class="sr-only">Password</label>
            <div class="relative">
            <input
                type={`${showPassword ? "number" : "password"}`}
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukkan Password / NIK Baru"
            />

            <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <div>
                    {
                        showPassword ? <FontAwesomeIcon icon={faEye} onClick={handleShowPassword} /> : <FontAwesomeIcon icon={faEyeSlash} onClick={handleShowPassword} />
                    }
                </div>
            </span>
            </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="umur">Umur</label>
              <input
                className="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                placeholder="Umur"
                type="number"
                name="umur"
                onChange={handleChange}
                value={hitungUmur(users?.tgl_lahir)}
                id="umur"
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full px-5 py-3 font-medium text-white bg-black rounded-lg sm:w-auto"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
        </div>
        </div>
        </LayoutPage>
        </>
    )
}

export default EditUser