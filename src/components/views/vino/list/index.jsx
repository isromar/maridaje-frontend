import React, { useState, useEffect } from "react";
import { getData } from "../../../../utility/getData";
import { apiUrl } from "../../../../data/Url";
import { Eye, Trash2, Edit } from "react-feather";
import { mostrarMensajeConfirmacion, mostrarMensaje } from "../../../../utility/utils";
import { Link } from 'react-router-dom';
import TopMenu from "../../../menu";

/* Este componente muestra una tabla de vinos y permite ordenar los vinos por nombre y tipo. */
const TablaVinos = ({ busquedaNombreVino, selectedOption }) => {
  const [orden, setOrden] = useState("asc"); // Estado para controlar el orden
  const [vinosFiltrados, setVinosFiltrados] = useState([]); // Estado para almacenar los vinos filtrados

  const fetchData = async () => {
    try {
      const response = await getData(
        apiUrl.vinos,
        busquedaNombreVino,
        selectedOption
      );
      const data = response["hydra:member"];
      setVinosFiltrados(data); // Inicializa los vinos filtrados con todos los vinos
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [busquedaNombreVino, selectedOption]);

  // La función handleSort se encarga de cambiar el orden de los vinos según el encabezado en el que se haga clic.
  const handleSort = (tipo) => {
    const nextOrder = orden === "asc" ? "desc" : "asc";
    setOrden(nextOrder);
    let sortedVinos;
    if (tipo === "Nombre") {  // Ordena los vinos por el nombre
      sortedVinos = [...vinosFiltrados].sort((a, b) => {
        if (nextOrder === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
    } else if (tipo === "Tipo") { // Ordena los vinos por el tipo
      sortedVinos = [...vinosFiltrados].sort((a, b) => {
        if (nextOrder === "asc") {
          return a.tipoVino.nombre.localeCompare(b.tipoVino.nombre);
        } else {
          return b.tipoVino.nombre.localeCompare(a.tipoVino.nombre);
        }
      });
    }
  setVinosFiltrados(sortedVinos); // Actualiza el estado con los vinos ordenados
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped tabla-vinos">
          <thead>
            <tr>
              <th onClick={() => handleSort("Nombre")} className="cursor-pointer">
                Nombre{orden === "asc" ? " ⇅" : " ⇅"}{" "}
                {/* Agrega el símbolo de las flechas y el manejador de clic para ordenar*/}
              </th>{" "}
              <th onClick={() => handleSort("Tipo")} className="cursor-pointer">
                Tipo{orden === "asc" ? " ⇅" : " ⇅"}{" "}
              </th>{" "}
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
                    .map((itemComida, index) => (
                      <span key={itemComida["@id"]}>
                        {itemComida.nombre}
                        {index < vino.comida.length - 1 && ", "}{" "}
                        {/* Esto es para poner comas entre los valores, menos al último*/}
                      </span>
                    ))}
                </td>
                <td>
                  <Link to={`/view/${vino["@id"].split("/").pop()}`}>
                    <Eye size={20} className="cursor-pointer" />
                  </Link>
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
