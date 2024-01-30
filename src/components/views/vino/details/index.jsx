import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { apiUrl } from '../../../../data/Url';

const DetallesVino = ({ props }) => {
  console.log(props)
  //const vinoId = props.split("/").pop()
  //console.log(vinoId)
  const [vino, setVino] = useState(null);
  const vinoId = 54

  useEffect(() => {
    // Aquí deberías hacer una solicitud a tu API o base de datos para obtener los datos del vino por su ID
    // Por ejemplo, con fetch o axios
    if (vinoId) {
      fetch(`${apiUrl.vinos}/54`)
        .then(response => response.json())
        .then(data => setVino(data));
        console.log('vino')
        console.log(vino)
    }
  }, []);

  if (!vino) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2 className="centrar"><span> {vino.nombre} </span></h2>

      <div className="form-group details">
        <label>Tipo de Vino:</label>
        <input type="text" className="form-control disabled" value={vino.tipoVino.nombre} />
      </div>

      <div className="form-group details">
        <label>Maduración:</label>
        <input type="text" className="form-control disabled" value={vino.maduracion} />
      </div>

      <div className="form-group details">
        <label>Denominación de Origen:</label>
        <input type="text" className="form-control disabled" value={vino.denominacionOrigen.nombre} />
      </div>

      
      <div className="form-group details">
        <label>Ecológico:</label>
        <input type="text" className="form-control disabled" value={vino.ecologico ? 'Sí' : 'No'} />
      </div>

      <div className="form-group details">
        <label>Marida con:</label>
        <span className="form-control disabled">
          {vino.comida.map((itemComida, index) => {
            return (
              <span key={itemComida["@id"]} >
                {itemComida.nombre}
                {index < vino.comida.length - 1 && ", "}
              </span>
            );
          })}
        </span>
      </div>

      <div className="form-group details">
        <label>Variedad de uva:</label>
        <span className="form-control disabled">
        {vino.variedad_uva.map((itemVariedadUva, index) => {
          return (
            <span key={itemVariedadUva["@id"]}>
              {itemVariedadUva.nombre}
              {index < vino.variedad_uva.length - 1 && ", "}
            </span>
          );
        })}            
        </span>
      </div>

      <h4 className="centrar"><span> {vino.bodega.nombre} </span></h4>

      <div className="form-group details direccion">
        <label>Dirección:</label>
        <input type="text" className="form-control disabled" value={vino.bodega.direccion} />
      </div>

      <div className="form-group details">
        <label>Teléfono:</label>
        <input type="text" className="form-control disabled" value={vino.bodega.telefono} />
      </div>

      <div className="form-group details">
        <label>CIF:</label>
        <input type="text" className="form-control disabled" value={vino.bodega.cif} />
      </div>

      <div className="form-group details">
        <label>Web:</label>
        <input type="text" className="form-control disabled" value={vino.bodega.cif} />
      </div>

    </div>
  );
}

export default DetallesVino;