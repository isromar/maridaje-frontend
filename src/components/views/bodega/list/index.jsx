import React from "react";
import TablaVinos from "../../vino/list";

const PerfilBodega = ({ nombre }) => {
  return (
    <div>
            <section className="perfil-bodega centrar">
      <h2 className="centrar">
        <span>Bodega - {nombre} </span>
      </h2>
      </section>

      <TablaVinos />
    </div>
  );
};

export default PerfilBodega;
