import { useEffect, useState } from "react";
import LayoutPage from "../Layout/LayoutPage";
import axios from 'axios';
import { getCurrentIdentitas, getIdentitas } from "../Service/identitas.service";
import { getChecklist } from "../Service/cheklist.service";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const FormMonitoring = () => {
  const [calendar, setCalendar] = useState([]);
  const [checklist, setChecklist] = useState({});
  const [tglHaid, setTglHaid] = useState('');
  const jumlah = Object.values(checklist).filter(value => value === true).length;
  
  useEffect(() => {
    getCurrentIdentitas((data) => {
      setTglHaid(data.data.tgl_haid_terakhir);
    });

    getChecklist((data) => {
      const formattedChecklist = data.checklist.reduce((acc, item) => {
        acc[`bulan_${item.bulan_ke}_day_${item.hari_ke}`] = item.checked;
        return acc;
      }, {});
      setChecklist(formattedChecklist);
    });
  }, []);
  console.log(tglHaid)
  console.log(getCurrentIdentitas(data => data))
  const startDate = new Date(tglHaid);
  const newDate = new Date(startDate);
  newDate.setMonth(startDate.getMonth() + 1);
  const handleGenerateCalendar = () => {
    if (!tglHaid) {
      alert('Tanggal haid terakhir belum tersedia atau anda belum mengisi form identitas.');
      return;
    }

    const startDate = new Date(newDate);
    const newCalendar = [];

    for (let i = 0; i < 9; i++) {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(startDate.getMonth() + i);

      const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

      newCalendar.push({
        bulan_ke: i + 1,
        start_date: startOfMonth.toDateString(),
        end_date: endOfMonth.toDateString(),
        days_in_month: endOfMonth.getDate(),
      });
    }

    setCalendar(newCalendar);
  };

  const handleCheckboxChange = (bulanKe, dayIndex, checked) => {
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      [`bulan_${bulanKe}_day_${dayIndex}`]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await axios.post(`${import.meta.env.VITE_REACT_API_URL}/ttdmonitoring`, {
        identitas_id:sessionStorage.getItem('identitas_id'), 
        checklist 
      });

      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
      alert('Gagal menyimpan data.');
    }
  };

  return (
    <LayoutPage>
      <div className="container max-w-4xl p-4 mx-auto">
        <h3 className="mb-4 text-2xl font-semibold">Kartu Kontrol Minum TTD pada Ibu Hamil</h3>
        
        <div className="mb-4">
          <button 
            onClick={handleGenerateCalendar} 
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Generate Calendar
          </button>
        </div>
        <span className="inline-flex mb-2 items-center justify-center rounded-full border border-emerald-500 px-2.5 py-0.5 text-emerald-700">
        Jumlah Pil Diminum : {jumlah}
        </span>
        <Tabs>
        <TabList className="flex gap-2 overflow-y-auto">
          {calendar.map((item, index) => (
            <Tab key={index} className={`px-4 py-2 lg:px-24 flex justify-center  text-white cursor-pointer bg-pink-600 rounded hover:bg-pink-800`}>{`Bulan ke-${item.bulan_ke}`}</Tab>
          ))}
        </TabList>
      
      {calendar.map((item, index) => (
        <TabPanel key={index}>
          <h4 className="mb-2 text-xl font-medium">{`Bulan ke-${item.bulan_ke}`}</h4>
          <p className="mb-4 text-gray-600">{item.start_date} - {item.end_date}</p>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: item.days_in_month }, (_, dayIndex) => {
              const currentDate = new Date(item.start_date);
              currentDate.setDate(currentDate.getDate() + dayIndex);     
              return (
                <div 
                  key={dayIndex} 
                  className="p-2 text-center border border-gray-300 rounded hover:bg-gray-50"
                >
                  <input 
                    type="checkbox" 
                    checked={checklist[`bulan_${item.bulan_ke}_day_${dayIndex + 1}`] || false}
                    onChange={(e) => handleCheckboxChange(item.bulan_ke, dayIndex + 1, e.target.checked)} 
                    className="mr-2"
                  />
                  <div>{currentDate.getDate()}</div>
                </div>
              );
            })}
          </div>
        </TabPanel>
        
            ))}
      </Tabs>

        <button 
          onClick={handleSubmit} 
          className="px-4 py-2 mt-6 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Simpan Data
        </button>
      </div>
    </LayoutPage>
  );
};

export default FormMonitoring;
