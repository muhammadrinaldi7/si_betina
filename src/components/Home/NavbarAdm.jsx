import { faBook, faDashboard, faFileMedical, faFolder, faHome, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const NavbarAdm = () => {
    return (
        <ul className="flex w-full mt-6 mb-4 text-xl menu menu-horizontal justify-evenly bg-base-200 rounded-box">
        <li>
            <NavLink to="/homepage">
            <a className="tooltip" data-tip="Home">
            <FontAwesomeIcon icon={faHome} />
            </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard">
            <a className="tooltip" data-tip="Dashboard">
            <FontAwesomeIcon icon={faFolder} />
            </a>
            </NavLink>
        </li>
        <li>
        <NavLink to="/users">
            <a className="tooltip" data-tip="Data Pribadi">
               <FontAwesomeIcon icon={faUsers}/>
            </a>
        </NavLink>
        {/* <li>
        <NavLink to="/checkup">
            <a className="tooltip" data-tip="Pemeriksaan">
            <FontAwesomeIcon icon={faFileMedical} />
            </a>
        </NavLink>
        </li> */}
        </li>
        </ul>

    )
}

export default NavbarAdm