import React from 'react';

const DetallesVino = ({ vino }) => {
  return (
    <div>
      <h2>{vino.nombre}</h2>
      <p>Denominación de Origen: {vino.denominacionOrigen}</p>
      <p>Maridaje: {vino.maridaje}</p>
      <p>Bodega: {vino.bodega}</p>
    </div>
  );
}

export default DetallesVino;