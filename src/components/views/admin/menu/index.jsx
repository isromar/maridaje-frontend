import React from "react";
import { Link } from "react-router-dom";

const MenuElementosAdmin = () => {
  return (
    <div className="bodega-menu">
      <nav>
        <ul>
          <li>
            <Link to="/perfil-admin/denominacion-origen">
              Denominación de origen
            </Link>
          </li>
          <li>
            <Link to="/perfil-admin/variedad-uva">
              Variedad de uva
            </Link>
          </li>
          <li>
            <Link to="/perfil-admin/tipo-vino">
              Tipo de vino
            </Link>
          </li>
          <li>
            <Link to="/perfil-admin/comida">
              Comida
            </Link>
          </li>
          <li>
            <Link to="/vinos">
              Vinos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuElementosAdmin;