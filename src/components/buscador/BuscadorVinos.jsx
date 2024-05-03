import React, { useState } from "react";

const BuscadorVinos = ({ setSelectedOption, setBusquedaNombreVino, busquedaNombreVino }) => {

  const handleBusquedaChange = async (event) => {
    const nuevaBusqueda = event.target.value;
    setBusquedaNombreVino(nuevaBusqueda);
    setSelectedOption(null); // Restablecer el valor del Select
  };
  
  const handleBlur = (e) => {
    if (e.target.value === '') {
      setSelectedOption(null);
    }
  };

  return (
    <div className="input input-group">
      <input
        type="text"
        className="buscador-vinos centrar form-control"
        value={busquedaNombreVino}
        onChange={handleBusquedaChange}
        placeholder="Nombre del vino"
        onBlur={handleBlur}
      />
    </div>
  );
};

export default BuscadorVinos;