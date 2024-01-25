import React, { useState, useEffect } from "react";
import { getData } from "../../utility/getData";
import { apiUrl } from "../../data/Url";
import { Eye, Trash2, Edit } from "react-feather";

const TablaVinos = ({ busquedaNombreVino, selectedOption }) => {
  console.log(busquedaNombreVino);
  const [vinos, setVinos] = useState([]); // Inicializa vinos como un array
  const [orden, setOrden] = useState("asc"); // Estado para controlar el orden
  const [vinosFiltrados, setVinosFiltrados] = useState([]); // Estado para almacenar los vinos filtrados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          apiUrl.vinos,
          busquedaNombreVino,
          selectedOption
        );
        const data = response["hydra:member"];
        setVinos(data); // Actualiza el estado con los datos obtenidos
        setVinosFiltrados(data); // Inicializa los vinos filtrados con todos los vinos
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [busquedaNombreVino, selectedOption]);

  // Función para manejar el clic en el encabezado "Tipo"
  const handleSort = () => {
  const nextOrder = orden === "asc" ? "desc" : "asc";
  setOrden(nextOrder);
  const sortedVinos = [...vinosFiltrados].sort((a, b) => {
    if (nextOrder === "asc") {
      return a.tipoVino.nombre.localeCompare(b.tipoVino.nombre);
    } else {
      return b.tipoVino.nombre.localeCompare(a.tipoVino.nombre);
    }
  });
  setVinosFiltrados(sortedVinos); // Actualiza el estado con los vinos ordenados
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped tabla-vinos">
          <thead>
            <tr>
              <th onClick={handleSort} className="cursor-pointer">
                Nombre{orden === "asc" ? "⇅" : "⇅"}{" "}
                {/* Agrega el símbolo de las flechas */}
              </th>{" "}
              {/* Agrega el manejador de clic para ordenar */}
              <th onClick={handleSort} className="cursor-pointer">
                Tipo{orden === "asc" ? "⇅" : "⇅"}{" "}
                {/* Agrega el símbolo de las flechas */}
              </th>{" "}
              {/* Agrega el manejador de clic para ordenar */}
              <th>Maridaje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vinosFiltrados.map((vino, index) => (
              <tr key={vino["@id"]}>
                <td>{vino.nombre}</td>
                <td>{vino.tipoVino.nombre}</td>
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
