import { useNavigate } from "react-router";
import favIcon from "../../assets/favicon.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFileMedical, faHome, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavbarLg = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/", { replace: true });
    }
    return (
        
    <div className="navbar bg-base-100 rounded-md">
    <div className="navbar-start">
        <NavLink to="/"><a className="btn btn-ghost text-xl"><FontAwesomeIcon icon={faHome} /> Si Betina</a></NavLink>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-[16px] px-1">
        <li>
            <NavLink to="/education">
            <a><FontAwesomeIcon icon={faBook} /> Education</a>
            </NavLink>
        </li>
        <li>
        <NavLink to="/checkup">
            <a> <FontAwesomeIcon icon={faFileMedical} /> Pemeriksaan</a>
        </NavLink>
        </li>
        <li>
            <NavLink to="/identity">
            <a><FontAwesomeIcon icon={faUser} /> Identitas</a>
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

export default NavbarLg