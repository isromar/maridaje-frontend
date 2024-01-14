import React, { useState } from "react";

const BuscadorVinos = () => {
  const [busqueda, setBusqueda] = useState("");

  const handleBusquedaChange = (event) => {
    const nuevaBusqueda = event.target.value;
    // Realizar aquí la lógica para obtener las opciones coincidentes
    setBusqueda(nuevaBusqueda);
  };

  return (
    <div className="input input-group">
      <input
        type="text"
        className="buscador-vinos centrar"
        value={busqueda}
        onChange={handleBusquedaChange}
        placeholder="Nombre del vino..."
      />
      {/* Aquí deberías mostrar la tabla con las opciones coincidentes */}
    </div>
  );
};

export default BuscadorVinos;
