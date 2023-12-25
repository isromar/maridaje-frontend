import React, { useState, useEffect } from "react";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";

const TablaVinos = () => {
  const [vinos, setVinos] = useState([]); // Inicializa vinos como un array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(apiUrl.vinos);
        const data = response["hydra:member"];
          console.log(data[0])
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Maduración</th>
              <th>DO</th>
              <th>Bodega</th>
              <th>Variedad uva</th>
              <th>Ecológico</th>
              <th>Acciones</th>
            </tr>
          </thead>
            <tbody>
                {vinos.map((vino) => (
                <tr key={vino.id}>
                    <td>{vino.nombre}</td>
                    <td>{vino.tipo}</td>
                    <td>{vino.maduracion}</td>
                    <td>{vino.denominacion_origen}</td>
                    <td>{vino.bodega}</td>
                    <td>{vino.variedad_uva}</td>
                    <td>{vino.ecologico}</td>
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
