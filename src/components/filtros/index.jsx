// Componente superior que contiene tanto ComidaSelect como BuscadorVinos
import React, { useState } from "react";
import ComidaSelect from "../select/ComidaSelect";
import BuscadorVinos from "../buscador/BuscadorVinos";
import TablaVinos from "../views/vino/list";

const ComponenteSuperior = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [busquedaNombreVino, setBusquedaNombreVino] = useState("");
  const [placeholder, setPlaceholder] = useState("Nombre del vino...");

  return (
    <>
      <div className="row justify-content-center">
      <div className="col-4 col-sm-4 d-flex justify-content-center">
          <ComidaSelect
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setBusquedaNombreVino={setBusquedaNombreVino}
            setPlaceholder={setPlaceholder}
          />
        </div>
        <div className="col-4 col-sm-4 d-flex align-items-center justify-content-center">
          <BuscadorVinos
            setSelectedOption={setSelectedOption}
            setBusquedaNombreVino={setBusquedaNombreVino}
            busquedaNombreVino={busquedaNombreVino}
            setPlaceholder={setPlaceholder}
            placeholder={placeholder}
          />
        </div>
      </div>
      <br />
      <div className="row">
        <TablaVinos
          busquedaNombreVino={busquedaNombreVino}
          selectedOption={selectedOption}
        />
      </div>
    </>
  );
};

export default ComponenteSuperior;
