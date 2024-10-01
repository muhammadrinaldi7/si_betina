import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LayoutPage from "../Layout/LayoutPage"
import { faEye, faEyeLowVision, faEyeSlash, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import anemiaPregant from "../../assets/anemiaPregant.png"
import hemoglobin from "../../assets/Hemoglobin.png"
import obatTmbh from "../../assets/obatTambh.png"
import anemiaBumil from "../../assets/anemiaBumil.png"
import howAnemia from "../../assets/howAnemia.jpg"
import dampakAnemia from "../../assets/dampakAnemia.jpg"
import cegahAnemia from "../../assets/cegahAnemia.jpg"
const Index = () =>{
    const HamilBebasAnemia = () => {
        return(
            <>
                <div className="mt-3 grid grid-cols-1 text-justify">
                    <div className="flex flex-col">
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={anemiaPregant} className="w-[150px] rounded-md h-[150px]" alt="" />
                        </div>
                        <p className=""><span className="font-bold">Anemia pada ibu hamil</span> Adalah kondisi tubuh ibu hamil yang ditandai dengan hasil pemeriksaan kadar hemoglobin (HB) dalam darah lebih rendah dari normal.</p>
                    </div>
                    <div className="flex flex-col ">
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={hemoglobin} className="w-[150px] rounded-md h-[150px]" alt="" />
                        </div>
                        <p><span className="font-bold">Hemoglobin (HB)</span> Adalah bagian dalam sel darah merah dalam tubuh yang berfungsi untuk membawa oksigen dan menghantarkannya ke seluruh sel jaringan tubuh.</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={obatTmbh} className="w-[150px] rounded-md h-[150px]" alt="" />
                        </div>
                        <p><span className="font-bold">Tablet Tambah Darah (TTD)</span> merupakan suplemen pada ibu hamil yang bertujuan untuk menambah/suplemen untuk mencegah anemia.</p>
                    </div>
                    <span class="relative mt-4 flex justify-center">
                        <div
                            class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                        <span class="relative z-10 bg-red-300 rounded-lg my-2 px-6">GEJALA ANEMIA</span>
                    </span>                
                    <div className="flex flex-col">   
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={anemiaBumil} className="w-[300px] rounded-md h-[400px]" alt="Genbest" />
                        </div>   
                        <ol className=" ml-4">
                            <li className="list-decimal font-bold">Anemia Ringan</li>
                            <p className="justify-center text-justify">Gejal-gejala tersebut sering disebut sebagai gejala 5 L (Lesu, Letih, Lemah, Lelah dan Lalai). </p>
                            <li className="list-decimal font-bold">Anemia Sedang</li>
                            <p className="justify-center text-justify">Pada tahap ini mulai timbul gejala yang lebih nyata,  misalnya berupa jantung terasa sering berdebar, lebih sering merasa lelah dengan aktivitas biasa, sesak nafas, dan terlihat lebih pucat dari biasanya. </p>
                            <li className="list-decimal font-bold">Anemia Berat</li>
                            <p className="justify-center text-justify">Timbul gejala yang lebih berat berupa kelelahan yang berkepanjangan, menggigil, jantung berdebar cepat, pucat lebih nyata, sesak nafas, nyeri dada, dan gangguan fungsi organ lainnya. </p>
                        </ol>
                    </div>
                    <span class="relative mt-4 flex justify-center">
                        <div
                            class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                        <span class="relative z-10 bg-red-300 rounded-lg my-2 px-6">PENYEBAB ANEMIA PADA IBU HAMIL</span>
                    </span>                
                    <div className="flex flex-col">   
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={howAnemia} className="w-[320px] rounded-md h-[320px]" alt="Genbest" />
                        </div>   
                        <ol className=" ml-4">
                            <li className="list-decimal">Kekurangan asupan zat gizi (zat besi, asam folat, vitamin B12, dan protein) karena sedang hamil sehingga mengganggu pembentukan hemoglobin.</li>                            
                            <li className="list-decimal">Pola konsumsi  yang  salah berisiko menderita anemia.</li>
                            <li className="list-decimal">Pada ibu hamil, terjadi pembesaran berbagai organ tubuh seperti payudara, uterus, dan pembentukan plasenta serta penambahan jumlah darah.</li>
                            <li className="list-decimal">Pertumbuhan janin yang makin lama makin besar Kondisi ini akan menyebabkan meningkatnya kebutuhan zat gizi. Bila tidak terpenuhi maka ibu hamil berisiko menderita anemia, atau bila sudah menderita anemia, maka anemianya akan semakin parah.</li>
                        </ol>
                    </div>
                    <span class="relative mt-4 flex justify-center">
                        <div
                            class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                        <span class="relative z-10 bg-red-300 rounded-lg my-2 px-6">DAMPAK ANEMIA PADA IBU HAMIL</span>
                    </span>                
                    <div className="flex flex-col">   
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={dampakAnemia} className="w-[320px] rounded-md h-[320px]" alt="Genbest" />
                        </div>   
                        <ol className=" ml-4">
                            <li className="list-decimal">Risiko terjadinya  perdarahan yang meningkatkan risiko kematian ibu.</li>                            
                            <li className="list-decimal">Menurunnya fungsi kekebalan tubuh, sehingga mudah menderita penyakit infeksi.</li>
                            <li className="list-decimal">Menghambat pertumbuhan janin:</li>
                            <ul>
                                <li className="ml-4 list-disc">Bayi lahir prematur, berat badan lahir rendah (BBLR) dan panjang badan lahir rendah (PBLR).</li>
                                <li className="ml-4 list-disc">Risiko sakit dan anemia pada bayi.</li>
                                <li className="ml-4 list-disc">Risiko stunting pada usia bayi dan anak usia kurang 2 tahun (1000 HPK).</li>
                            </ul>
                        </ol>
                    </div>
                    <span class="relative mt-4 flex justify-center">
                        <div
                            class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                        ></div>
                        <span class="relative text-md z-10 bg-red-300 rounded-lg my-2 px-4">PENCEGAHAN ANEMIA PADA IBU HAMIL</span>
                    </span>                
                    <div className="flex flex-col">   
                        <div className="w-full flex justify-center lg:justify-start items-center">
                        <img src={cegahAnemia} className="w-[320px] rounded-md h-[320px]" alt="Genbest" />
                        </div>   
                        <ol className=" ml-4">
                            <li className="list-decimal">Mengkonsumsi Aneka Ragam Makanan yang Dapat Meningkatkan HB:</li>     
                                <ul>
                                    <li className="ml-4 list-disc">Sayuran Berwarna Hijau</li>
                                    <li className="ml-4 list-disc">Mencukupi Kebutuhan Vitamin C</li>
                                    <li className="ml-4 list-disc">Makanan Sumber Hewani (Daging, Ikan, Belut)</li>
                                    <li className="ml-4 list-disc">Buah-Buahan (Buah Naga, Pisang/Kurma)</li>
                                    <li className="ml-4 list-disc">Minum Air Putih 8-12 Gelas/Hari</li>
                                </ul>
                            <li className="list-decimal">Membiasakan Perilaku Hidup Bersih Ibu Hamil.</li>
                                <ul>
                                    <li className="ml-4 list-disc">Mencuci Tangan Dengan Sabun dan Air Mengalir.</li>
                                    <li className="ml-4 list-disc">Mandi Menggosok Gigi 2x Sehari.</li>
                                    <li className="ml-4 list-disc">Menjaga Kebersihan Payudara dan Daerah Kewanitaan.</li>
                                </ul>
                            <li className="list-decimal">Melakukan aktifitas fisik (Olahraga ringan ibu hamil).</li>
                                <ul>
                                    <li className="ml-4 list-disc">Olahraga Ringan Ibu Hamil.</li>
                                    <li className="ml-4 list-disc">Tidur Malam Minimal 6-7 Jam, Siang Hari Usahakan 1-2 Jam.</li>
                                </ul>
                            <li className="list-decimal">Memantau Berat Badan dan Melakukan Penimbangan Secara Teratur, Bersama Tenaga Kesehatan Untuk Memantau Grafik Peningkatan Berat Badan.</li>
                                
                            <li className="list-decimal">Mengkonsumsi Tablet Tambah Darah.</li>
                            <ul>
                                <li className="ml-4 list-disc">Pemberian Tablet Tambah Darah Pada Ibu Hamil Sebagai Suplemen Besi :</li>
                                <p className="font-bold">"Ibu hamil wajib meminum tablet tambah darah minimal 90 biji selama kehamilan tanpa melihat status anemia."</p>
                                <p>Pemberian Dosis 1 tablet setiap hari selama kehamilan.</p>
                            </ul>
                        </ol>
                    </div>
                </div>
            </>
        )
    }
    return (
        <LayoutPage>
        <div className="space-y-4 mt-2">
            <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open>
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="font-medium">HAMIL BEBAS ANEMIA?</h2>
                <span className="relative size-5 shrink-0">
                   <FontAwesomeIcon icon={faEye}  className="absolute inset-0 size-5 opacity-100 group-open:opacity-0"  />
                   <FontAwesomeIcon icon={faEyeSlash}  className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                </span>
                </summary>
                <HamilBebasAnemia />
            </details>

            {/* <details className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="font-medium">PENYAKIT JANTUNG BAWAAN?</h2>
                <span className="relative size-5 shrink-0">
                <FontAwesomeIcon icon={faEye}  className="absolute inset-0 size-5 opacity-100 group-open:opacity-0" />
                <FontAwesomeIcon icon={faEyeSlash}  className="absolute inset-0 size-5 opacity-0 group-open:opacity-100" />
                </span>
                </summary>

                <p className="mt-4 leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in,
                recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo
                consequuntur distinctio corporis earum similique!
                </p>
            </details> */}
        </div>
        </LayoutPage>
    )
}

export default Index
