import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from 'react-router-dom';
import { mostrarMensaje } from "../../../../utility/utils";
import Swal from "sweetalert2";
import TopMenu from "../../../menu";

function DetallesVino() {
  let { vinoId } = useParams();
  const [vino, setVino] = useState(null);

  useEffect(() => {
    mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
    // Aquí deberías hacer una solicitud a tu API o base de datos para obtener los datos del vino por su ID
    // Por ejemplo, con fetch o axios
    if (vinoId) {
      fetch(`${apiUrl.vinos}/${vinoId}`)
        .then((response) => response.json())
        .then((data) => setVino(data));
    }
    setTimeout(() => {
      Swal.close(); // Cierra el mensaje después de un segundo
    }, 1000);
  }, [vinoId]);

  if (!vino) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="view">
      <div>
        <TopMenu />
      </div>

      <section className="vino-view">
        <h2 className="centrar">
          <span>Vino - {vino.nombre} </span>
        </h2>

        <table className="tabla-view">
          <tr>
            <td>Tipo de vino:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.tipoVino ? vino.tipoVino.nombre : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Maduración:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino ? vino.maduracion : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Denominación de origen:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.denominacionOrigen ? vino.denominacionOrigen.nombre : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Ecológico:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.ecologico ? "Sí" : "No"}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Precio:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={`${vino.precio} €`}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Marida con:</td>
            <td>
              <span className="form-control disabled">
                {vino.comida
                  .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
                  .map((itemComida, index) => {
                    return (
                      <span key={itemComida["@id"]}>
                        {itemComida.nombre}
                        {index < vino.comida.length - 1 && ", "}
                      </span>
                    );
                  })}
              </span>
            </td>
          </tr>

          <tr>
            <td>Variedad de uva:</td>
            <td>
              <span className="form-control disabled">
                {vino.variedad_uva
                  .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
                  .map((itemVariedadUva, index) => {
                    return (
                      <span key={itemVariedadUva["@id"]}>
                        {itemVariedadUva.nombre}
                        {index < vino.variedad_uva.length - 1 && ", "}
                      </span>
                    );
                  })}
              </span>
            </td>
          </tr>

        </table>
      </section>

      <section className="bodega-view">
        <h2 className="centrar col-xs-12">
          <span>Bodega - {vino.bodega ? vino.bodega.nombre : ""}</span>
        </h2>

        <table className="tabla-view">
          <tr>
            <td>Dirección:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.bodega ? vino.bodega.direccion : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Teléfono:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.bodega ? vino.bodega.telefono : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>CIF:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.bodega ? vino.bodega.cif : ""}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Web:</td>
            <td>
              <input
                type="text"
                className="form-control disabled link-style"
                value={vino.bodega.web}
                readOnly
                onClick={() => window.open(vino.bodega.web, "_blank")}
              />
            </td>
          </tr>
        </table>
      </section>
    </div>
  );
};

export default DetallesVino;
