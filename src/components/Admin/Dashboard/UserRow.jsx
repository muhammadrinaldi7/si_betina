import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const UserRow = ({ data, openDropdown, toggleDropdown }) => {
    console.log(data)
    return (
        <>
            <tr className="odd:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    <button onClick={() => toggleDropdown(data.id)} className="flex items-center focus:outline-none">
                        {data.nama}
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`ml-2 transform transition-transform duration-200 ${
                                openDropdown === data.id ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {data.identitas_bumil?.alamat || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {data.identitas_bumil?.no_telp || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {data.identitas_bumil?.tafsiran_kehamilan || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {data.identitas_bumil?.no_telp ? (
                        <a
                            href={`https://wa.me/62${data.identitas_bumil.no_telp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block rounded bg-[#63E6BE] px-4 py-2 text-xs font-medium text-white hover:bg-[#3bc98b]"
                        >
                            Hubungi
                        </a>
                    ) : (
                        <a
                            aria-disabled="true"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 text-xs font-medium text-white bg-gray-300 rounded disabled"
                        >
                            Hubungi
                        </a>
                    )}
                </td>
            </tr>
            {openDropdown === data.id && (
                <tr>
                    <td colSpan="5" className="px-6 py-4">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Tanggal Periksa
                                    </th>
                                    <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Hemoglobin
                                    </th>
                                    <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                        Diagnosa
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.pemeriksaan.length > 0 ? (
                                    data.pemeriksaan.map((pemeriksaan) => (
                                        <tr key={pemeriksaan.id}>
                                            <td className="px-4 py-2 text-sm text-gray-700">{pemeriksaan.tanggal_periksa}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{pemeriksaan.hemoglobin}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700">{pemeriksaan.diagnosa_anemia}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-2 text-sm text-center text-gray-500">
                                            Belum ada pemeriksaan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
        </>
    );
};

export default UserRow;
