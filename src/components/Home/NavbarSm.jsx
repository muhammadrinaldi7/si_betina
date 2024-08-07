import { faBook, faFileMedical, faHome, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const NavbarSm = () => {
    return (
        <ul className="menu menu-horizontal w-full flex text-xl justify-evenly mb-4 bg-base-200 rounded-box mt-6">
        <li>
            <NavLink to="/homepage">
            <a className="tooltip" data-tip="Home">
            <FontAwesomeIcon icon={faHome} />
            </a>
            </NavLink>
        </li>
        <li>
            <NavLink to="/education">
            <a className="tooltip" data-tip="Education">
            <FontAwesomeIcon icon={faBook} />
            </a>
            </NavLink>
        </li>
        <li>
            <a className="tooltip" data-tip="Pemeriksaan">
            <FontAwesomeIcon icon={faFileMedical} />
            </a>
        </li>
        <li>
            <a className="tooltip" data-tip="Data Pribadi">
               <FontAwesomeIcon icon={faUser}/>
            </a>
        </li>
        </ul>

    )
}

export default NavbarSm