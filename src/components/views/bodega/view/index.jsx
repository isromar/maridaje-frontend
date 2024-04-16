import React, { useEffect, useState } from "react";
import TablaVinosBodega from "../list";
import TopMenu from "../../../menu";
import { useParams } from "react-router-dom";
import { obtenerNombreBodega } from "../../../../utility/utils";
import MenuElementosBodega from "../menu";

const PerfilBodega = () => {
  const { bodegaId } = useParams();
  const [nombreBodega, setNombreBodega] = useState('');

  useEffect(() => {
    const fetchNombreBodega = async () => {
      const nombre = await obtenerNombreBodega(bodegaId);
      setNombreBodega(nombre);
    };
    fetchNombreBodega();
  }, []);

  return (
    <div>
      <div>
        <TopMenu/>
      </div>
      <div>
        <section className="perfil-bodega centrar">
          <h2 className="centrar">
            <span>Bodega - {nombreBodega} </span>
          </h2>
        </section>
        <div>
          <MenuElementosBodega/>
        </div>
      </div>
    </div>
  );
};

export default PerfilBodega;
