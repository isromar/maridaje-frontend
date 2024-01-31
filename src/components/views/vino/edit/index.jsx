import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from 'react-router-dom';

function EditarVino() {
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

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setVino((prevVino) => ({
      ...prevVino,
      [key]: value,
    }));
  };

  return (
    <form className="view">
      <section className="vino-view">
        <h2 className="centrar">
          <span>Vino - {vino.nombre} </span>
        </h2>
        <table className="tabla-view">
          <tr>
            <td>Tipo de Vino:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.tipoVino.nombre}
                onChange={(event) => handleInputChange(event, 'tipoVino')}
              />
            </td>
          </tr>

          <tr>
            <td>Maduración:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.maduracion}
                
              />
            </td>
          </tr>

          <tr>
            <td>Denominación de origen:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.denominacionOrigen.nombre}
                
              />
            </td>
          </tr>

          <tr>
            <td>Ecológico:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.ecologico ? "Sí" : "No"}
                
              />
            </td>
          </tr>

          <tr>
            <td>Marida con:</td>
            <td className>
              <span className>
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
            <td className="disabled">
              <span className="disabled">
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
                className="form-control "
                value={vino.bodega.direccion}
                
              />
            </td>
          </tr>

          <tr>
            <td>Teléfono:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.telefono}
                
              />
            </td>
          </tr>

          <tr>
            <td>CIF:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.cif}
                
              />
            </td>
          </tr>

          <tr>
            <td>Web:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.cif}
                
              />
            </td>
          </tr>
        </table>
      </section>
    </form>
  );
};

export default EditarVino;
