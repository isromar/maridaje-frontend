import React from "react";
import TablaVinosBodega from "../list";
import TopMenu from "../../../menu";

const PerfilBodega = ({ nombre }) => {
  return (
    <div>
      <div>
        <TopMenu/>
      </div>
      <div>
        <section className="perfil-bodega centrar">
          <h2 className="centrar">
            <span>Bodega - {nombre} </span>
          </h2>
        </section>
        <button className="btn-nuevo-vino btn btn-light">Añadir nuevo vino</button>
        <TablaVinosBodega />
      </div>
    </div>
  );
};

export default PerfilBodega;
