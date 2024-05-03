import { Link } from "react-router-dom";
import BarraNavegacion from "../barra-navegacion";

const TopMenu = () => {
  const usuario = localStorage.getItem("usuario");
  const bodegaId = localStorage.getItem("bodegaId");
  const acceso = localStorage.getItem("acceso");
  const admin = localStorage.getItem("admin");

  return (
    <div className="top-menu">
      <nav className="nav justify-content-center">
        <ul className="d-flex">
          <li className="nav-item menu-li">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
          {usuario && bodegaId && acceso && !admin && (
          <li className="nav-item li-bodega">
            <Link to={`/perfil-bodega/${bodegaId}`} className="nav-link">
              Perfil bodega
            </Link>
          </li>
          )}
          {usuario && bodegaId && acceso && admin && (
          <li className="nav-item li-admin">
              <Link to="/perfil-admin" className="nav-link">
              Perfil admin
              </Link>
          </li>
          )}
        </ul>
        <span className="input-acceso">
          <BarraNavegacion/>
        </span>
      </nav>
    </div>
  );
};

export default TopMenu;
