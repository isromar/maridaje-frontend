import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";

import {
  mostrarMensaje
} from "../../../../utility/utils";
import Swal from "sweetalert2";
import TablaVinos from "../../vino/list";


const ListaVinosAdmin = () => {

  useEffect(() => {
    mostrarMensaje("Cargando datos...", "Espere mientras se cargan los datos", "info");

    // Simulación de carga de datos
    setTimeout(() => {
      Swal.close();

    }, 4000); // Simular una carga de 2 segundos
  }, []);

  return (
    <div className="perfil-admin-container">
      <div>
        <TopMenu />
      </div>

      <div className="perfil-admin-title">
        <section className="perfil-admin centrar">
          <h2 className="centrar">
            <span>Administrador</span>
          </h2>
        </section>
          <TablaVinos/>
        </div>
    </div>
  );
};

export default ListaVinosAdmin;
