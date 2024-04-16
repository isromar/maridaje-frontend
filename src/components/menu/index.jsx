import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopMenu = () => {
  const usuario = localStorage.getItem("usuario");
  const bodegaId = localStorage.getItem("bodegaId");
  const acceso = localStorage.getItem("acceso");
  const admin = localStorage.getItem("admin");

  return (
    <div className="top-menu">
      <nav>
        <ul>
          <li>
            <Link to="/">
              Inicio
            </Link>
          </li>
          {usuario && bodegaId && acceso && !admin && (
            <li>
              <Link to={`/perfil-bodega/${bodegaId}`}>
                Perfil bodega
              </Link>
            </li>
          )}
          {usuario && bodegaId && acceso && admin && (
            <li>
                <Link to="/perfil-admin">
                Perfil admin
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TopMenu;
