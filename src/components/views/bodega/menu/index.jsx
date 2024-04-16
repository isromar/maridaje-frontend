import React from "react";
import { Link } from "react-router-dom";

const MenuElementosBodega = () => {
const bodegaId = localStorage.getItem("bodegaId");

  return (
    <div className="bodega-menu">
      <nav>
        <ul className="centered-links">
          <li className="menu-item">
            <Link to={`/perfil-bodega/${bodegaId}/vinos`}>
              Ver vinos
            </Link>
          </li>
          <li className="menu-item">
            <Link to={`/perfil-bodega/${bodegaId}/nuevo-vino`}>
              Añadir nuevo vino
            </Link>
          </li>
          <li className="menu-item">
            <Link to={`/perfil-bodega/${bodegaId}/editar-bodega`}>
              Editar datos bodega
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuElementosBodega;