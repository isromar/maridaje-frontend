// ComidaSelect.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";

const ComidaSelect = () => {
  const [comidas, setComidas] = useState([]); // Inicializa el estado con un array vacío
  const [comidaSeleccionada, setComidaSeleccionada] = useState('');
  localStorage.setItem('comidaSeleccionada', JSON.stringify(comidaSeleccionada));


  const handleChange = comidaSeleccionada => {
    setComidaSeleccionada(comidaSeleccionada);
    localStorage.setItem('comidaSeleccionada', JSON.stringify(comidaSeleccionada));
    console.log(`Option selected:`, comidaSeleccionada);

  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(apiUrl.comidas);
        const data = response["hydra:member"];
        const options = [
          { value: 1, label: "tinto" },
          { value: 2, label: "blanco" }
        ];
        /*
                const options = data.map((comida) => ({
          value: comida.id,
          label: comida.nombre,
        }));
        */
        setComidas(options);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="select comida-select">
        <Select
          //options={comidas}
          className="form-group"
          value={comidaSeleccionada}
          onChange={handleChange}
          options={comidas.sort((a, b) => a.label.localeCompare(b.label))} // Ordena los datos
          placeholder="Selecciona comida..."
        />
      </div>
    </>
  );
};

export default ComidaSelect;
