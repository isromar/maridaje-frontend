import React, { useState, useEffect } from "react";
import { getData } from "../../../../utility/getData";
import { apiUrl } from "../../../../data/Url";
import { Eye, Trash2, Edit } from "react-feather";
import { mostrarMensaje, mostrarMensajeConfirmacion } from "../../../../utility/utils";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

/* Este componente muestra una tabla de vinos y permite ordenar los vinos por nombre y tipo. */
const TablaVinos = ({ busquedaNombreVino, selectedOption }) => {
  const [orden, setOrden] = useState("asc"); // Estado para controlar el orden
  const [vinosFiltrados, setVinosFiltrados] = useState([]); // Estado para almacenar los vinos filtrados
  const acceso = localStorage.getItem("acceso");

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
    mostrarMensaje(
      "Cargando datos...",
      "Espere mientras se cargan los datos",
      "info"
    );

    fetchData();

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 2000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [busquedaNombreVino, selectedOption]);

  // La función handleSort se encarga de cambiar el orden de los vinos según el encabezado en el que se haga clic.
  const handleSort = (tipo) => {
    const nextOrder = orden === "asc" ? "desc" : "asc";
    setOrden(nextOrder);
    let sortedVinos;
    if (tipo === "Nombre") {
      // Ordena los vinos por el nombre
      sortedVinos = [...vinosFiltrados].sort((a, b) => {
        if (nextOrder === "asc") {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
    } else if (tipo === "Tipo") {
      // Ordena los vinos por el tipo
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

  const handleDelete = (urlVinoId) => {
    const vinoId = urlVinoId.split("/").pop(); // Obtiene la id del vino, ya que llega en urlVinoId como api/vinos/vinoId
    mostrarMensajeConfirmacion(
      "¿Quieres borrar este vino?",
      "Esta acción no se puede deshacer",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el registro de la base de datos
        fetch(`${apiUrl.vinos}/${vinoId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Lógica para manejar la eliminación exitosa
              mostrarMensaje(
                "¡Borrado!",
                "El registro ha sido eliminado",
                "success"
              );
              fetchData(); // Llama a fetchData para actualizar la lista de vinos
            } else {
              mostrarMensaje(
                "¡Error!",
                "El registro no se ha podido eliminar",
                "error"
              );
            }
          })
          .catch((error) => {
            // Lógica para manejar errores de red u otros errores
          });
      }
    });
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped tabla-vinos">
          <thead>
            <tr>
              <th
                onClick={() => handleSort("Nombre")}
                className="cursor-pointer"
              >
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

                  {acceso ? (
                    <>
                      <Link to={`/edit/${vino["@id"].split("/").pop()}`}>
                        <Edit size={20} className="cursor-pointer" />
                      </Link>
                      <Trash2
                        size={20}
                        className="cursor-pointer"
                        onClick={() => handleDelete(vino["@id"])}
                      />
                    </>
                  ) : null}
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
