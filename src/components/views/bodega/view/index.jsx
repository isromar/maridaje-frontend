import React, { useEffect, useState } from "react";
import TopMenu from "../../../menu";
import { useParams } from "react-router-dom";
import { obtenerNombreBodega } from "../../../../utility/utils";
import MenuElementosBodega from "../menu";
import setBasePath from "../../../../utility/redirectUtils";
import { mostrarMensaje } from "../../../../utility/utils";


const PerfilBodega = () => {
  const { bodegaId } = useParams();
  const [nombreBodega, setNombreBodega] = useState('');
  const [acceso, setAcceso] = useState(true);

  useEffect(() => {
    const validarAccesoBodega = () => {
      const bodegaIdLocalStorage = localStorage.getItem('bodegaId');
      if (bodegaIdLocalStorage !== bodegaId) {
        mostrarMensaje(
          "Acceso denegado",
          "No tienes acceso a esta bodega",
          "error"
        );
        setAcceso(false);
        setTimeout(() => {
          const path = `/perfil-bodega/${bodegaIdLocalStorage}`;
          setBasePath(path);
        }, 4000);
      } else {
        const fetchNombreBodega = async () => {
          const nombre = await obtenerNombreBodega(bodegaId);
          setNombreBodega(nombre);
        };
        fetchNombreBodega();
      }
    };

    validarAccesoBodega();
  }, [bodegaId]);

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
