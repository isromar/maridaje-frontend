// Componente superior que contiene tanto ComidaSelect como BuscadorVinos
import React, { useState } from "react";
import ComidaSelect from "../select/ComidaSelect";
import BuscadorVinos from "../buscador/BuscadorVinos";

const ComponenteSuperior = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [busqueda, setBusqueda] = useState(null);
  const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  return (
    <>
      <div className="col col-6 col-sm-6">
        <ComidaSelect
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setBusqueda={setBusqueda}
          setPlaceholder={setPlaceholder}
        />
      </div>
      <div className="col col-6 col-sm-6">
        <BuscadorVinos
          setSelectedOption={setSelectedOption}
          setBusqueda={setBusqueda}
          busqueda={busqueda}
          setPlaceholder={setPlaceholder}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default ComponenteSuperior;
