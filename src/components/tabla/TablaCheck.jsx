import React, { useState, useEffect } from "react";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";
import Checkbox from "../check/Checkbox";
import { MultiSelect } from "react-multi-select-component";

const opciones = [
  { label: "Bobal", value: "bobal" },
  { label: "Garnacha", value: "garnacha" },
  { label: "Syrah", value: "syrah" },
  { label: "Tempranillo", value: "tempranillo" },
  { label: "Tintorera", value: "tintorera" },
  { label: "Mencía", value: "mencia" }
];

const TablaCheck = () => {
  const [variedadesUva, setVariedadesUva] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selected, setSelected] = useState([]);
          // Crea un array de objetos con la estructura { value: id, label: nombre }


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la consulta a la base de datos para obtener los tipos de vino
        const response = await getData(apiUrl.variedadUvas);
        const data = response["hydra:member"];
        // Establece el estado con el array creado
        setVariedadesUva(opciones);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="table-responsive">
        <table className="tabla-check">
          <tbody>
            <tr>
              <th>Tipo</th>
              <td>
                <Checkbox label="tinto" />
              </td>
              <td>
                <Checkbox label="blanco" />
              </td>
              <td>
                <Checkbox label="rosado" />
              </td>
              <td>
                <Checkbox label="cava" />
              </td>
              <td>
                <Checkbox label="espumoso" />
              </td>
              <td>
                <Checkbox label="otro" />
              </td>
            </tr>

            <tr>
              <th>Variedad Uva</th>
              <td className='select' colSpan="6">
              <MultiSelect
                options={opciones}
                value={selected}
                onChange={setSelected}
              />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCheck;
