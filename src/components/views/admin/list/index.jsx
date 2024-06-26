import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import TablaVinosBodega from "../../bodega/list";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje } from "../../../../utility/utils";
import MenuElementosAdmin from "../menu";

const PerfilAdmin = () => {

  useEffect(() => {

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
        
        <div>
          <MenuElementosAdmin/>
        </div>
      </div>
    </div>
  );
};

export default PerfilAdmin;