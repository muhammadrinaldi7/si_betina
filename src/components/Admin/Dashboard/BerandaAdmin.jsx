import React, { useState, useEffect } from "react";
import LayoutPage from "../../Layout/LayoutPage";
import { getAllPemeriksaan } from "../../Service/pemeriksaanAll.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import PemeriksaanDetail from "./PemeriksaanDetail";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router";

const BerandaAdmin = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [pemeriksaan, setPemeriksaan] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllPemeriksaan((data) => {
      setPemeriksaan(Object.values(data.data));
      setChecklist(Object.values(data.data));
    });
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleEdit = (bumilId) => {
    // Logika untuk edit data kehamilan
    console.log(`Edit data kehamilan ID: ${bumilId}`);
  };

  const handleDelete = (bumilId) => {
    // Logika untuk menghapus data kehamilan
    if (window.confirm("Apakah Anda yakin ingin menghapus data kehamilan ini?")) {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.delete(`${import.meta.env.VITE_REACT_API_URL}/identitas/${bumilId}`).then((response) => {
        console.log(response.data);
        navigate("/dashboard", { replace: true });
      }).catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <LayoutPage>
      <div className="w-full p-2">
        <div className="grid h-20 card bg-secondary-content rounded-box place-items-center">
          <h1 className="text-2xl font-bold">Data Pemeriksaan</h1>
        </div>
        <div className="divider"></div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white divide-y-2 divide-gray-200">
            <thead className="bg-secondary-content">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Nama</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Alamat</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">No. Telp</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Tafsiran Kehamilan</th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                pemeriksaan.map((data) => (
                  <React.Fragment key={data.id}>
                    <tr className="odd:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        <button onClick={() => toggleDropdown(data.id)} className="flex items-center focus:outline-none">
                          {data.nama}
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`ml-2 transform transition-transform duration-200 ${openDropdown === data.id ? "rotate-180" : ""}`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {data.identitas_bumil[0]?.alamat || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {data.identitas_bumil[0]?.no_telp || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {data.identitas_bumil[0]?.tafsiran_kehamilan || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                        {
                          data.identitas_bumil[0]?.no_telp ? (
                            <a
                              href={`https://wa.me/62${data.identitas_bumil[0].no_telp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block rounded bg-[#63E6BE] px-4 py-2 text-xs font-medium text-white hover:bg-[#3bc98b]"
                            >
                              <FontAwesomeIcon icon={faWhatsapp}/> Hubungi
                            </a>
                          ) : (
                            <a
                              aria-disabled="true"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-4 py-2 text-xs font-medium text-white bg-gray-300 rounded disabled"
                            >
                              <FontAwesomeIcon icon={faWhatsapp}/> Hubungi
                            </a>
                          )
                        }
                      </td>
                    </tr>
                    {openDropdown === data.id && (
                      <tr>
                        <td colSpan="5" className="px-6 py-4">
                          { data.identitas_bumil.length > 0 ? (
                            data.identitas_bumil.map((bumil, index) => (
                              <div key={index} className="mt-4">
                                <h2 className="text-lg font-semibold">{`Data Kehamilan ke-${index + 1}`}</h2>
                                <p>Nama Suami: {bumil.nama_suami}</p>
                                <p>Tanggal Haid Terakhir: {bumil.tgl_haid_terakhir}</p>
                                <p>Taksiran Persalinan: {bumil.tafsiran_kehamilan}</p>

                                {/* Tombol Edit dan Hapus */}
                                <div className="mt-2">
                                  
                                  <Link
                                    to={`/admin/ubahkehamilan/${bumil.id}`}
                                    className="inline-block px-4 py-2 mr-2 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(bumil.id)}
                                    className="inline-block px-4 py-2 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                                  >
                                    Hapus
                                  </button>
                                </div>

                                <PemeriksaanDetail pemeriksaan={bumil.pemeriksaan} ttdRecord={bumil.ttd_record} kehamilan={index + 1} />
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">Tidak ada data Kehamilan/Pemeriksaan.</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </LayoutPage>
  );
};

export default BerandaAdmin;
