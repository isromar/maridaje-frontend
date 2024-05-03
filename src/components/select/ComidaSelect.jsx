// ComidaSelect.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { apiUrl } from "../../data/Url";
import ErrorBoundary from "../error";

const ComidaSelect = ({ selectedOption, setSelectedOption, setBusquedaNombreVino, setPlaceholder }) => {
  const [comidas, setComidas] = useState([]); // Inicializa el estado con un array vacío

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    setBusquedaNombreVino("");
    setPlaceholder("Nombre del vino...");
  };
  
  // Carga los valores de las comidas en el Select
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl.comidas);
        const data = await response.json();
        if (data && data["hydra:member"]) {
          const options = data["hydra:member"].map((comida) => ({
            value: comida.id,
            label: comida.nombre,
          }));
          setComidas(options);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <ErrorBoundary>
      <div className="select">
        <Select
          //options={comidas}
          className="form-group comida-select"
          value={selectedOption}
          onChange={handleChange}
          options={comidas.sort((a, b) => a.label.localeCompare(b.label))} // Ordena los datos
          placeholder="Selecciona comida..."
        />
      </div>
      </ErrorBoundary>
    </>
  );
};

export default ComidaSelect;
