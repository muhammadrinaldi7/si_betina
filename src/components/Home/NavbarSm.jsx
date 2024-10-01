import { faBook, faFileMedical, faHome, faPills, faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

const NavbarSm = () => {
    return (
        <ul className="menu menu-horizontal text-lg w-full flex lg:text-xl justify-evenly mb-4 bg-base-200 rounded-box mt-6">
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
        <NavLink to="/checkup">
            <a className="tooltip" data-tip="Pemeriksaan">
            <FontAwesomeIcon icon={faFileMedical} />
            </a>
        </NavLink>
        </li>
        {/* <li>
        <NavLink to="/persalinan">
            <a className="tooltip" data-tip="Persalinan">
            <FontAwesomeIcon icon={faPersonBreastfeeding} />
            </a>
        </NavLink>
        </li> */}
        <li>
        <NavLink to="/form-monitoring">
            <a className="tooltip" data-tip="Obat TTD">
               <FontAwesomeIcon icon={faPills}/>
            </a>
        </NavLink>
        </li>
        <li>
        <NavLink to="/identity">
            <a className="tooltip" data-tip="Data Pribadi">
               <FontAwesomeIcon icon={faUser}/>
            </a>
        </NavLink>
        </li>
        <li>
        <NavLink to="/messages">
            <a className="tooltip" data-tip="Pertanyaan">
               <FontAwesomeIcon icon={faQuestionCircle}/>
            </a>
        </NavLink>
        </li>
        </ul>

    )
}

export default NavbarSm