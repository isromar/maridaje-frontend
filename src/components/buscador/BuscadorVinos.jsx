import React, { useState } from "react";

const BuscadorVinos = ({ setSelectedOption, setBusquedaNombreVino, busquedaNombreVino, setPlaceholder, placeholder }) => {
  //const [busqueda, setBusqueda] = useState("");
  //const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  const handleBusquedaChange = async (event) => {
    const nuevaBusqueda = event.target.value;
    // Realizar aquí la lógica para obtener las opciones coincidentes
    setBusquedaNombreVino(nuevaBusqueda);
    console.log(nuevaBusqueda)
    setSelectedOption(null); // Restablecer el valor del Select
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      setPlaceholder("Nombre del vino...");
      setSelectedOption(null);
    }
  };

  return (
    <div className="input input-group">
      <input
        type="text"
        className="buscador-vinos centrar"
        value={busquedaNombreVino}
        onChange={handleBusquedaChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default BuscadorVinos;
