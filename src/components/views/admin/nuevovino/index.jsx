import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";

const NuevoVinoAdmin = () => {

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
        
        <div className="perfil-admin-content">
          
        </div>

      </div>
    </div>
  );
};

export default NuevoVinoAdmin;
