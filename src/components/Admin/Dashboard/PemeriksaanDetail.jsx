import React from "react";

const PemeriksaanDetail = ({ pemeriksaan, kehamilan, ttdRecord }) => {
    // Menghitung jumlah hari meminum obat berdasarkan checklist
    const calculateObatDays = (checklist) => {
        if (!checklist) return 0; // Menangani kasus jika checklist tidak ada
        const obatDays = Object.values(checklist).filter(value => value === true).length;
        return obatDays;
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold">Detail Pemeriksaan Kehamilan Ke {kehamilan}</h3>
            {pemeriksaan.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Tanggal Periksa</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Hemoglobin</th>
                            <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">Tgl Periksa Berikutnya</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pemeriksaan.map((periksa, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-sm text-gray-700">{periksa.tanggal_periksa}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{periksa.hemoglobin}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{periksa.tgl_periksa_berikutnya}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-sm text-gray-500">Tidak ada data pemeriksaan.</p>
            )}

            <div className="mt-4">
                <h4 className="font-semibold text-md">Jumlah Konsumsi Tablet TTD</h4>
                <p className="text-sm text-gray-700">
                    Jumlah hari ibu meminum obat: {ttdRecord ? calculateObatDays(ttdRecord.checklist) : 0}
                </p>
            </div>
        </div>
    );
};

export default PemeriksaanDetail;
