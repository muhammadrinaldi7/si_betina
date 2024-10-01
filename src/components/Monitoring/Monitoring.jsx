import { useEffect, useState } from "react";
import axios from 'axios';
import LayoutPage from "../Layout/LayoutPage"
import { Link } from "react-router-dom";

const Monitoring = () => {
    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    useEffect(() => {
      const fetchChecklist = async () => {
        try {
          const id = sessionStorage.getItem('identitas_id');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${import.meta.env.VITE_REACT_API_URL}/ttdmonitoring/${id}`);
          setChecklist(response.data.checklist);
        } catch (error) {
          console.error('Terjadi kesalahan saat memuat data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchChecklist();
    }, []);
    console.log(checklist)
    if (loading) return <p>Loading...</p>;
  
    const renderChecklist = () => {
      if (checklist.length === 0) return (
        <>
        <p>Belum ada data checklist.</p>
        <Link to="/form-monitoring" className="btn btn-primary">Checklist</Link>
        </>

      );
  
      return checklist.map((item, index) => (
        <div key={index}>
          <span>Bulan ke-{item.bulan_ke}, Hari ke-{item.hari_ke}: {item.checked ? 'Checked' : 'Unchecked'}</span>
        </div>
      ));
    };
    return (
        <>
          <LayoutPage>
          <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>Checklist TTD Anda</h3>
      {renderChecklist()}
    </div>
          </LayoutPage>
        </>
    )
}

export default Monitoring