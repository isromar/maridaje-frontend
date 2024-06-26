import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje, mostrarMensajeConfirmacion } from "../../../../utility/utils"
import Swal from "sweetalert2";


const TipoVinoOptions = () => {
  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");
  const [nuevoTipoVino, setNuevoTipoVino] = useState("");
  
  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
  
    fetchTiposDeVino();
  
    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 2000);
  }, []);


  const fetchTiposDeVino = async () => {
    try {
      // Mostrar mensaje de cargando datos
      mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');

      const response = await fetch(apiUrl.tiposDeVino);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((tipo) => ({
            value: tipo.id,
            label: tipo.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          setTiposDeVino(options);

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

  const handleAddTipoVino = async () => {
    if (nuevoTipoVino) {
      const nuevoTipoVinoObj = {
        nombre: nuevoTipoVino,
      };
  
      try {
        const response = await fetch(`${apiUrl.tiposDeVino}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(nuevoTipoVinoObj),
        });
  
        if (response.ok) {
          const nuevoVinoAgregado = await response.json();
          setTiposDeVino((prevTiposDeVino) => [
            ...prevTiposDeVino,
            nuevoVinoAgregado,
          ]);
          fetchTiposDeVino();
          setNuevoTipoVino("");
          mostrarMensaje('Registro añadido', 'Registro añadido con éxito', 'success');
        } else {
          mostrarMensaje('Error al añadir el registro', 'Hubo un error al añadir el registro', 'error');
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje('Error al añadir el registro', 'Hubo un error al añadir el registro', 'error');
      }
    }
  };

 
  const handleDeleteTipoVino = async () => {    
    if (tipoVinoSelected) {
      mostrarMensajeConfirmacion('¿Quieres borrar este registro?', 'Esta acción no se puede deshacer', 'warning')
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`${apiUrl.tiposDeVino}/${tipoVinoSelected.value}`, {
            method: "DELETE",
        })
        .then(() => {
          setTiposDeVino((prevTiposDevino) => prevTiposDevino.filter((option) => option.value !== tipoVinoSelected.value) );

          setTipoVinoSelected(null);
          setNuevoTipoVino("");

          mostrarMensaje('Registro eliminado', 'Registro eliminado con éxito', 'success');
        })
        .catch((error) => {
            console.error("Error al eliminar el registro", error);
            mostrarMensaje('Error al eliminar el registro', 'Hubo un error al eliminar el registro', 'error');
          });
        }
      });
  }
};

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
          <section>
            <h3>Tipo de vino</h3>
            <div className="select-container">
              <Select
                options={tiposDeVino}
                value={tipoVinoSelected}
                onChange={setTipoVinoSelected}
                placeholder="Tipos de vino"
              />
            </div>
            
            <div className="input-container">
            <input
                className="disabled"
                type="text"
                placeholder="Tipo de vino seleccionado"
                value={tipoVinoSelected ? tipoVinoSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteTipoVino(tipoVinoSelected)}>Borrar</button>
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Nuevo tipo de vino"
                value={nuevoTipoVino}
                onChange={(e) => setNuevoTipoVino(e.target.value)}
              />
              <button onClick={handleAddTipoVino}>Añadir</button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default TipoVinoOptions;