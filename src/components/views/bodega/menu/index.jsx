import React from "react";
import { Link } from "react-router-dom";

const MenuElementosBodega = () => {
const bodegaId = localStorage.getItem("bodegaId");

return (
  <div className="bodega-menu d-flex justify-content-center">
    <nav className="navbar navbar-expand-lg">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={`/perfil-bodega/${bodegaId}/lista-vinos`} className="nav-link">
            Lista de vinos
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/perfil-bodega/${bodegaId}/nuevo-vino`} className="nav-link">
            Añadir nuevo vino
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/perfil-bodega/${bodegaId}/editar-bodega`} className="nav-link">
            Editar datos bodega
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
};

export default MenuElementosBodega;