import React, { useState, useEffect } from "react";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";
import Checkbox from "../check/Checkbox";

const TablaVinos = () => {
  const [vinos, setVinos] = useState([]); // Inicializa vinos como un array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(apiUrl.vinos);
        const data = response["hydra:member"];
        console.log(data[0]);
        setVinos(data); // Actualiza el estado con los datos obtenidos
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Resultado de la búsqueda</h1>
      <div className="table-responsive">
        <table className="table table-striped tabla-vinos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Maduración</th>
              <th>DO</th>
              <th>Bodega</th>
              <th>Variedad uva</th>
              <th>Ecológico</th>
              <th>Maridaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vinos.map((vino, index) => (
              <tr key={vino["@id"]}>
                <td>{vino.nombre}</td>
                <td>{vino.tipoVino.nombre}</td>
                <td>{vino.maduracion}</td>
                <td>{vino.denominacionOrigen.nombre}</td>
                <td>{vino.bodega.nombre}</td>
                <td>
                  {vino.variedad_uva
                    .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar por el nombre de la variedad de uva
                    .map((variedad, index) => (
                      <span key={variedad["@id"]}>
                        {variedad.nombre}
                        {index < vino.variedad_uva.length - 1 && ", "}{" "}
                        {/* Esto es para poner comas entre los valores, menos al último*/}
                      </span>
                    ))}
                </td>
                <td>{vino.ecologico}</td>
                <td>
                  {vino.comida
                    .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar por el nombre de la comida
                    .map((comida, index) => (
                      <span key={comida["@id"]}>
                        {comida.nombre}
                        {index < vino.comida.length - 1 && ", "}{" "}
                        {/* Esto es para poner comas entre los valores, menos al último*/}
                      </span>
                    ))}
                </td>
                <td>Ver,Editar,Borrar</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaVinos;
