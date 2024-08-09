import IndexRegister from "./components/Register/Index";
import Layout from "./components/Layout/LayoutAuth";
import IndexLogin from "./components/Login/Index";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import IndexHome from "./components/Home/Index";
import IndexEducation from "./components/Education/Index";
import LayoutPage from "./components/Layout/LayoutPage";
import IndexIdentity from "./components/Identitas/Index";
import IndexCheckup from "./components/Pemeriksaan/Index";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexLogin />} />
          <Route path="/register" element={<IndexRegister />} />
          <Route path="/homepage" element={<IndexHome />} />
          <Route path="/education" element={<IndexEducation />} />
          <Route path="/identity" element={<IndexIdentity />} />
          <Route path="/checkup" element={<IndexCheckup />} />
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