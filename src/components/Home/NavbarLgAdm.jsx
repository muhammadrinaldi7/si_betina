import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFolder, faHome, faPills, faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavbarLgAdm = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/", { replace: true });
    }
    return (
        
    <div className="rounded-md navbar bg-base-100">
    <div className="navbar-start">
        <NavLink to="/"><a className="text-xl btn btn-ghost"><FontAwesomeIcon icon={faHome} /> Si Betina</a></NavLink>
    </div>
    <div className="hidden navbar-center lg:flex">
        <ul className="menu menu-horizontal text-[16px] lg:text-[24px] px-1">
        <li>
            <NavLink to="/homepage">
            <a className="tooltip" data-tip="Home">
            <FontAwesomeIcon icon={faHome} /> Home
            </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard">
            <a className="tooltip" data-tip="Dashboard">
            <FontAwesomeIcon icon={faFolder} /> Dashboard
            </a>
            </NavLink>
        </li>
        <li>
        <NavLink to="/users">
            <a className="tooltip" data-tip="Data Pribadi">
               <FontAwesomeIcon icon={faUser}/> Pengguna
            </a>
        </NavLink>
        </li>
        </ul>
    </div>
    <div className="navbar-end">
        <button className="btn" onClick={handleLogout}>Log Out</button>
    </div>
    </div>
    )
}

export default NavbarLgAdm