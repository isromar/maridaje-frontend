import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje, mostrarMensajeConfirmacion } from "../../../../utility/utils"
import Swal from "sweetalert2";


const VariedadUvaOptions = () => {
  const [variedadesUva, setVariedadesUva] = useState([]);
  const [variedadUvaSelected, setVariedadUvaSelected] = useState(null);
  const [nuevaVariedadUva, setNuevaVariedadUva] = useState("");
  
  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
  
    fetchVariedadesUva();
  
    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 2000);
  }, []);


  const fetchVariedadesUva = async () => {
    try {
      // Mostrar mensaje de cargando datos
      mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');

      const response = await fetch(apiUrl.variedadesUva);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((variedad) => ({
            value: variedad.id,
            label: variedad.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          setVariedadesUva(options);

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

  const handleAddVariedadUva = async () => {
    if (nuevaVariedadUva) {
      const nuevaVariedadUvaObj = {
        nombre: nuevaVariedadUva,
      };
  
      try {
        const response = await fetch(`${apiUrl.variedadesUva}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(nuevaVariedadUvaObj),
        });
  
        if (response.ok) {
          const nuevaVariedadUvaAgregada = await response.json();
          setVariedadesUva((prevVariedadesUva) => [
            ...prevVariedadesUva,
            nuevaVariedadUvaAgregada,
          ]);
          fetchVariedadesUva();
          setNuevaVariedadUva("");
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

 
  const handlDeleteVariedadUva = async () => {    
    if (variedadUvaSelected) {
      mostrarMensajeConfirmacion('¿Quieres borrar este registro?', 'Esta acción no se puede deshacer', 'warning')
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`${apiUrl.variedadesUva}/${variedadUvaSelected.value}`, {
            method: "DELETE",
        })
        .then(() => {
          setVariedadesUva((prevVariedadesUva) => prevVariedadesUva.filter((option) => option.value !== variedadUvaSelected.value) );
          setVariedadUvaSelected(null);
          setNuevaVariedadUva("");
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
          <h3>Variedad de uva</h3>
            <div className="select-container">
              <Select
                options={variedadesUva}
                value={variedadUvaSelected}
                onChange={setVariedadUvaSelected}
                placeholder="Variedades de uva"
              />
            </div>
          
          <div className="input-container">
              <input
                className="disabled"              
                type="text"
                placeholder="Variedad de uva seleccionada"
                value={variedadUvaSelected ? variedadUvaSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handlDeleteVariedadUva(variedadUvaSelected)}>Borrar</button>
            </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Nueva variedad de uva"
              value={nuevaVariedadUva}
              onChange={(e) => setNuevaVariedadUva(e.target.value)}
            />
            <button onClick={handleAddVariedadUva}>Añadir</button>
          </div>
        </section>
      </div>

    </div>
  </div>
);
};

export default VariedadUvaOptions;