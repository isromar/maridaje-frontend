import React, { useState, useEffect } from "react";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";
import { Eye, Trash2, Edit } from "react-feather";

const TablaVinos = () => {
  const [vinos, setVinos] = useState([]); // Inicializa vinos como un array
  const [orden, setOrden] = useState('asc'); // Estado para controlar el orden

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

  // Función para manejar el clic en el encabezado "Tipo"
  const handleSort = () => {
    const nextOrder = orden === 'asc' ? 'desc' : 'asc';
    setOrden(nextOrder);
    const sortedVinos = [...vinos].sort((a, b) => {
      if (nextOrder === 'asc') {
        return a.tipoVino.nombre.localeCompare(b.tipoVino.nombre);
      } else {
        return b.tipoVino.nombre.localeCompare(a.tipoVino.nombre);
      }
    });
    setVinos(sortedVinos);
  };


  return (
    <div>
      <br/>
      <div className="table-responsive">
        <table className="table table-striped tabla-vinos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th onClick={handleSort} className="cursor-pointer">Tipo{orden === 'asc' ? '⇅' : '⇅'} {/* Agrega el símbolo de las flechas */}</th> {/* Agrega el manejador de clic para ordenar */}
              <th onClick={handleSort} className="cursor-pointer">DO{orden === 'asc' ? '⇅' : '⇅'}</th>
              <th>Variedad de uva</th>
              <th>Maridaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vinos.map((vino, index) => (
              <tr key={vino["@id"]}>
                <td>{vino.nombre}</td>
                <td>{vino.tipoVino.nombre}</td>
                <td>{vino.denominacionOrigen.nombre}</td>
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
                <td>
                  <Eye size={20} className="cursor-pointer" />
                  <Edit size={20} className="cursor-pointer" />
                  <Trash2 size={20} className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaVinos;
