import IndexRegister from "./components/Register/Index";
import Layout from "./components/Layout/LayoutAuth";
import IndexLogin from "./components/Login/Index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import IndexHome from "./components/Home/Index";
import IndexEducation from "./components/Education/Index";
import IndexIdentity from "./components/Identitas/Index";
import IndexCheckup from "./components/Pemeriksaan/Index";
import PemeriksaanAdd from "./components/Pemeriksaan/PemeriksaanAdd";
import BerandaAdmin from "./components/Admin/Dashboard/BerandaAdmin";
import IndexUsers from "./components/Admin/Pengguna/Index";
import IndexPersalinan from "./components/Persalinan/IndexPersalinan";
import { Messages } from "./components/Messages/Messages";
import Monitoring from "./components/Monitoring/Monitoring";
import FormMonitoring from "./components/Monitoring/FormMonitoring";
import FormMonitor from "./components/Monitoring/FormMonitor";
import EditUser from "./components/Admin/Pengguna/EditUser";
import UpdateData from "./components/Admin/Dashboard/DataKehamilan/UpdateData";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<BerandaAdmin />} />
          <Route path="/users" element={<IndexUsers />} />
          <Route path="/admin/pengguna/edit/:id" element={<EditUser />} />
          <Route path="/admin/ubahkehamilan/:id" element={<UpdateData />} />
          <Route path="/" element={<IndexLogin />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/form-monitoring" element={<FormMonitoring />} />
          <Route path="/formMonitor" element={<FormMonitor />} />
          <Route path="/register" element={<IndexRegister />} />
          <Route path="/persalinan" element={<IndexPersalinan />} />
          <Route path="/homepage" element={<IndexHome />} />
          <Route path="/education" element={<IndexEducation />} />
          <Route path="/identity" element={<IndexIdentity />} />
          <Route path="/checkup" element={<IndexCheckup />} />
          <Route path="/pemeriksaan-add" element={<PemeriksaanAdd />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddCars />} />
          <Route path="/edit/:id" element={<EditCars />} /> */}
        </Routes>
      </Layout>
      </BrowserRouter>
    </>
  );
}

export default App