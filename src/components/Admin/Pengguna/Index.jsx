import React, { useState, useEffect } from 'react';
import LayoutPage from '../../Layout/LayoutPage';
import { getUsersAll } from '../../Service/usersAll.service';
import { Link } from 'react-router-dom';

const Index = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersAll((data) => {
            setUsers(Object.values(data.data));
        })
    }, []);
    console.log(users)
    return (
        <>
        <LayoutPage>
        <div className="w-full h-full p-2">
        <div className="flex flex-col w-full">
            <div className="grid h-20 bg-white card rounded-box place-items-center"><h1 className="text-2xl font-bold">Data Pengguna</h1></div>
            <div className="divider"></div>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full bg-white divide-y-2 divide-gray-200 text-md table-zebra">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Nama</th>
                            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Nik</th>
                            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Umur</th>
                            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Tanggal Lahir</th>
                            <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users?.map((data, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.nama}</td>
                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.nik}</td>
                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.umur}</td>
                                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{data.tgl_lahir}</td>
                                <td className="flex gap-2 px-4 py-2 text-gray-700 whitespace-nowrap">
                                    <button className="btn btn-primary">
                                    <Link to={`/admin/pengguna/edit/${data.id}`}>
                                        Edit
                                    </Link>
                                    </button>
                                    <button className="btn btn-error">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
        </div>
        </div>
        </LayoutPage>
        </>
    )
}

export default Index