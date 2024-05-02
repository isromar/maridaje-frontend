import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje, mostrarMensajeConfirmacion } from "../../../../utility/utils";
import Swal from "sweetalert2";

const ComidaOptions = () => {
  const [comidas, setComidas] = useState([]);
  const [comidaSelected, setComidaSelected] = useState("");
  const [nuevaComida, setNuevaComida] = useState("");
  const [comidaEdited, setComidaEdited] = useState("");

  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
  
    fetchComidas();
  
    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 2000);
  }, []);

  useEffect(() => {
    setComidaEdited(comidaSelected);
  }, [comidaSelected]);
  
  const fetchComidas = async () => {
    try {
      // Mostrar mensaje de cargando datos
      mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');

      const response = await fetch(apiUrl.comidas);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((comida) => ({
            value: comida.id,
            label: comida.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          setComidas(options);

          Swal.close();
        } else {
          console.error("No se encontraron datos.");
        }
    } catch (error) {
      console.error("Error al obtener los datos:", error);

      // Mostrar mensaje de error
      mostrarMensaje('Error al cargar los datos', 'Ha ocurrido un error al cargar los datos', 'error');
    }
  };


  const handleEditComida = async () => {
    if (!comidaEdited) {
      mostrarMensaje(
        "Error al actualizar el registro",
        "Por favor, rellena el campo",
        "warning"
      );
      return;
    }
  
    const updatedComida = {
      ...comidaSelected,
      nombre: comidaEdited, // Nuevo label actualizado
    };
  
    try {
      const response = await fetch(
        `${apiUrl.comidas}/${comidaSelected.value}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/ld+json",
          },
          body: JSON.stringify(updatedComida),
        }
      );
  
      if (response.ok) {
        const updatedComidaAgregada = await response.json();
        setComidas((prevComidas) =>
          prevComidas.map((option) =>
            option.value === comidaSelected.value
              ? updatedComidaAgregada
              : option
          )
        );
  
        fetchComidas();
  
        setComidaSelected(updatedComidaAgregada);
        setComidaEdited("");
  
        mostrarMensaje(
          "Registro actualizado",
          "Registro actualizado con éxito",
          "success"
        );
      } else {
        mostrarMensaje(
          "Error al actualizar el registro",
          "Hubo un error al actualizar el registro",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      mostrarMensaje(
        "Error al actualizar el registro",
        "Hubo un error al actualizar el registro",
        "error"
      );
    }
  };
  

  const handleAddComida = async () => {
    if (!nuevaComida) {
      mostrarMensaje(
        "Error al actualizar el registro",
        "Por favor, rellena el campo",
        "warning"
      );
      return;
    }
    if (nuevaComida) {
      const nuevaComidaObj = {
        nombre: nuevaComida,
      };
  
      try {
        const response = await fetch(`${apiUrl.comidas}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(nuevaComidaObj),
        });
  
        if (response.ok) {
          const nuevaComidaAgregada = await response.json();
          setComidas((prevComidas) => [
            ...prevComidas,
            nuevaComidaAgregada,
          ]);
          fetchComidas();
          setNuevaComida("");
          mostrarMensaje('Nuevo registro añadido', 'Registro añadido con éxito', 'success');
        } else {
          mostrarMensaje('Error al añadir el registro', 'Hubo un error al añadir el registro', 'error');
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje('Error al añadir el registro', 'Hubo un error al añadir el registro', 'error');
      }
    }
  };


  const handleDeleteComida = async () => {    
    if (comidaSelected) {
      mostrarMensajeConfirmacion('¿Quieres borrar este registro?', 'Esta acción no se puede deshacer', 'warning')
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`${apiUrl.comidas}/${comidaSelected.value}`, {
            method: "DELETE",
        })
        .then(() => {
          setComidas((prevComidas) => prevComidas.filter((option) => option.value !== comidaSelected.value) );
          setComidaSelected(null);
          setNuevaComida("");
          mostrarMensaje('Registro eliminado', 'Registro eliminado con éxito', 'success');
        })
        .catch((error) => {
            console.error("Error al eliminar el registro:", error);
            mostrarMensaje('Error al eliminar el registro', 'Hubo un error al eliminar el registro', 'error');
          });
        }
      });
  }
}
  
  return (
    <div className="perfil-admin-container">
      <div>
        <TopMenu />
      </div>

      <div className="perfil-admin-title">
        <section className="perfil-admin centrar">
          <h2 className="centrar">
            <span>Administrador</span>
          </h2>
        </section>
        
        <div className="perfil-admin-content">

         
          <section className="row">
            <h3>Comida</h3>
            <div className="select-container col-12 col-md-4">
              <Select
                options={comidas}
                value={comidaSelected}
                onChange={setComidaSelected}
                placeholder="Tipos de comida"
              />
            </div>
            
            <div className="input-container col-12 col-md-4">
              <input
                className="disabled"
                type="text"
                placeholder="Comida seleccionada"
                value={comidaSelected ? comidaSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteComida(comidaSelected)}>Borrar</button>
            </div>

            <div className="input-container col-12 col-md-4">
              <input
                type="text"
                placeholder="Editar comida"
                value={comidaEdited ? comidaEdited.label : ""}
                onChange={(e) => setComidaEdited(e.target.value)}
              />
              <button onClick={handleEditComida}>Editar</button>
            </div>

            <div className="input-container col-12 col-md-4">
              <input
                type="text"
                placeholder="Nueva comida"
                value={nuevaComida}
                onChange={(e) => setNuevaComida(e.target.value)}
              />
              <button onClick={handleAddComida}>Añadir</button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default ComidaOptions;