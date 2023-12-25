// ComidaSelect.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";

const ComidaSelect = () => {
  const [comidas, setComidas] = useState([]); // Inicializa el estado con un array vacío

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(apiUrl.comidas);
        const data = response["hydra:member"];
        const options = data.map((comida) => ({
          value: comida.id,
          label: comida.nombre,
        }));
        setComidas(options);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="comidaSelect">
        <Select
          //options={comidas}
          options={comidas.sort((a, b) => a.label.localeCompare(b.label))} // Ordena los datos
          placeholder="Selecciona comida..."
        />
      </div>
    </>
  );
};

export default ComidaSelect;
