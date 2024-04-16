import React, { useEffect, useState } from "react";
import TablaVinosBodega from "../list";
import TopMenu from "../../../menu";
import { useParams } from "react-router-dom";
import { obtenerNombreBodega } from "../../../../utility/utils";
import MenuElementosBodega from "../menu";

const VinosBodega = () => {
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
            <span>Vinos - {nombreBodega} </span>
          </h2>
        </section>
        <TablaVinosBodega />
      </div>
    </div>
  );
};

export default VinosBodega;
