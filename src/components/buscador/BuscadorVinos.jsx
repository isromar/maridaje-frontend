import React, { useState } from "react";

const BuscadorVinos = ({ setSelectedOption, setBusquedaNombreVino, busquedaNombreVino }) => {
  //const [busqueda, setBusqueda] = useState("");
  //const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  const handleBusquedaChange = async (event) => {
    const nuevaBusqueda = event.target.value;
    // Realizar aquí la lógica para obtener las opciones coincidentes
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