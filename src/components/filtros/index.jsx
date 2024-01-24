// Componente superior que contiene tanto ComidaSelect como BuscadorVinos
import React, { useState } from "react";
import ComidaSelect from "../select/ComidaSelect";
import BuscadorVinos from "../buscador/BuscadorVinos";
import TablaVinos from "../tabla";

const ComponenteSuperior = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [busquedaNombreVino, setBusquedaNombreVino] = useState('');
  const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  return (
    <>
      <div className='row'>
        <div className="col col-6 col-sm-6">
          <ComidaSelect
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setBusquedaNombreVino={setBusquedaNombreVino}
            setPlaceholder={setPlaceholder}
          />
        </div>
        <div className="col col-6 col-sm-6">
          <BuscadorVinos
            setSelectedOption={setSelectedOption}
            setBusquedaNombreVino={setBusquedaNombreVino}
            busquedaNombreVino={busquedaNombreVino}
            setPlaceholder={setPlaceholder}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className='row'>
        <div className="col col-12 col-sm-12">
          <TablaVinos busquedaNombreVino={busquedaNombreVino} selectedOption={selectedOption}/>
        </div>
      </div>
    </>
  );
};

export default ComponenteSuperior;
