import React from "react";
import { Link } from "react-router-dom";

const MenuElementosAdmin = () => {
  return (
    <div className="admin-menu">
      <nav>
        <ul className="centered-links">
          <li className="menu-item">
            <Link to="/perfil-admin/denominacion-origen">
              Denominación de origen
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/variedad-uva">
              Variedad de uva
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/tipo-vino">
              Tipo de vino
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/comida">
              Comida
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/perfil-admin/bodega">
              Bodega
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/perfil-admin/lista-vinos">
              Lista de vinos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuElementosAdmin;