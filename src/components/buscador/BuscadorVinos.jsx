import React, { useState } from "react";
import { apiUrl } from "../../data/Url";
import { getData } from "../../utility/getData";

const BuscadorVinos = ({ setSelectedOption, setBusqueda, busqueda, setPlaceholder, placeholder }) => {
  //const [busqueda, setBusqueda] = useState("");
  //const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  const handleBusquedaChange = async (event) => {
    const nuevaBusqueda = event.target.value;
    // Realizar aquí la lógica para obtener las opciones coincidentes
    setBusqueda(nuevaBusqueda);
    setSelectedOption(null); // Restablecer el valor del Select

    try {
      const data = await getData(apiUrl.vinos + nuevaBusqueda);
      // Aquí puedes manejar la respuesta de la búsqueda
      console.log(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
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
        value={busqueda}
        onChange={handleBusquedaChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* Aquí deberías mostrar la tabla con las opciones coincidentes */}
    </div>
  );
};

export default BuscadorVinos;
