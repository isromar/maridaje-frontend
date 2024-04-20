import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BarraNavegacion from "../barra-navegacion";

const TopMenu = () => {
  const usuario = localStorage.getItem("usuario");
  const bodegaId = localStorage.getItem("bodegaId");
  const acceso = localStorage.getItem("acceso");
  const admin = localStorage.getItem("admin");

  return (
    <div className="top-menu">
      <nav>
        <ul>
          <li class="menu-li">
            <Link to="/">
              Inicio
            </Link>
          </li>
          {usuario && bodegaId && acceso && !admin && (
          <li class="menu-li li-bodega">
            <Link to={`/perfil-bodega/${bodegaId}`}>
              Perfil bodega
            </Link>
          </li>
          )}
          {usuario && bodegaId && acceso && admin && (
          <li class="menu-li li-admin">
              <Link to="/perfil-admin">
              Perfil admin
              </Link>
          </li>
          )}
            <span class="input-acceso">
              <BarraNavegacion/>
            </span>
        </ul>
      </nav>
    </div>
  );
};

export default TopMenu;
