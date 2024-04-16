import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";

import {
  mostrarMensaje,
  mostrarMensajeConfirmacion,
} from "../../../../utility/utils";
import Swal from "sweetalert2";
import TablaVinos from "../../vino/list";

const ListaVinosAdmin = () => {
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
