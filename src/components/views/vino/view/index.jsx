import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from 'react-router-dom';

function DetallesVino() {
  let { vinoId } = useParams();
  const [vino, setVino] = useState(null);

  useEffect(() => {
    // Aquí deberías hacer una solicitud a tu API o base de datos para obtener los datos del vino por su ID
    // Por ejemplo, con fetch o axios
    if (vinoId) {
      fetch(`${apiUrl.vinos}/${vinoId}`)
        .then((response) => response.json())
        .then((data) => setVino(data));
    }
  }, []);

  if (!vino) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="view">
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
                value={vino.tipoVino.nombre}
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
                value={vino.maduracion}
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
                value={vino.denominacionOrigen.nombre}
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
        <h4 className="centrar">
          <span>Bodega - {vino.bodega.nombre} </span>
        </h4>
        <table className="tabla-view">
          <tr>
            <td>Dirección:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.bodega.direccion}
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
                value={vino.bodega.telefono}
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
                value={vino.bodega.cif}
                disabled="disabled"
              />
            </td>
          </tr>

          <tr>
            <td>Web:</td>
            <td>
              <input
                type="text"
                className="form-control disabled"
                value={vino.bodega.cif}
                disabled="disabled"
              />
            </td>
          </tr>
        </table>
      </section>
    </div>
  );
};

export default DetallesVino;
