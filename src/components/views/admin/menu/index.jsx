import React from "react";
import { Link } from "react-router-dom";

const MenuElementosAdmin = () => {
  return (
    <div className="admin-menu d-flex justify-content-center">
      <nav className="navbar navbar-expand-lg">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/perfil-admin/denominacion-origen" className="nav-link">
              Denominación de origen
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/variedad-uva" className="nav-link">
              Variedad de uva
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/tipo-vino" className="nav-link">
              Tipo de vino
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/comida" className="nav-link">
              Comida
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/bodega" className="nav-link">
              Bodega
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/lista-vinos" className="nav-link">
              Lista de vinos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/perfil-admin/nuevo-vino" className="nav-link">
              Añadir vino
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuElementosAdmin;
