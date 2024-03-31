import React, { useState, useEffect } from "react";
import { comprobarLogin } from "../../utility/getData";
import { mostrarMensaje } from "../../utility/utils";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom";

const TopMenu = () => {
  const usuario = localStorage.getItem("usuario");
  const bodegaId = localStorage.getItem("bodegaId");
  const acceso = localStorage.getItem("acceso");

  return (
    <div className="top-menu">
      <nav>
        <ul>
          <li>
            <Link to="/">
              Inicio
            </Link>
          </li>
          {usuario && bodegaId && acceso && (
            <li>
              {/*<Link to={`/perfil-bodega/${bodegaId}`>*/}
                <Link to="/perfil-bodega">
                Perfil bodega
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default TopMenu;
