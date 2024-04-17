import React from "react";
import { Link } from "react-router-dom";
import BarraNavegacion from "../../../barra-navegacion";

const MenuElementosAdmin = () => {
  return (
    <div className="admin-menu">
      <nav>
        <ul className="centered-links">
          <li className="menu-item">
            <Link to="/perfil-admin/denominacion-origen" className="menu-link">
              Denominación de origen
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/variedad-uva" className="menu-link">
              Variedad de uva
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/tipo-vino" className="menu-link">
              Tipo de vino
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/comida" className="menu-link">
              Comida
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/perfil-admin/bodega" className="menu-link">
              Bodega
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/lista-vinos" className="menu-link">
              Lista de vinos
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/nuevo-vino" className="menu-link">
              Añadir vino
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuElementosAdmin;