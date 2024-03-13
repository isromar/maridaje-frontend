import React from "react";
import TablaVinosBodega from "../list";

const PerfilBodega = ({ nombre }) => {
  return (
    <div>
      <section className="perfil-bodega centrar">
      <h2 className="centrar">
        <span>Bodega - {nombre} </span>
      </h2>
      </section>

      <TablaVinosBodega />
    </div>
  );
};

export default PerfilBodega;
