import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje, mostrarMensajeConfirmacion } from "../../../../../src/utility/utils"
import Swal from "sweetalert2";


const DenominacionOrigenOptions = () => {
  const [denominacionDeOrigen, setDenominacionDeOrigen] = useState([]);
  const [denominacionOrigenSelected, setDenominacionOrigenSelected] = useState(null);
  const [nuevaDenominacionOrigen, setNuevaDenominacionOrigen] = useState("");
  
  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
  
    fetchDenominacionDeOrigen();
  
    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 1000);
  }, []);


  const fetchDenominacionDeOrigen = async () => {
    try {
      // Mostrar mensaje de cargando datos
      mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');

      const response = await fetch(apiUrl.denominacionDeOrigen);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((denominacion) => ({
            value: denominacion.id,
            label: denominacion.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          setDenominacionDeOrigen(options);

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

  const handleAddDenominacionOrigen = async () => {
    if (nuevaDenominacionOrigen) {
      const nuevaDenominacionOrigenObj = {
        nombre: nuevaDenominacionOrigen,
      };
  
      try {
        const response = await fetch(`${apiUrl.denominacionDeOrigen}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(nuevaDenominacionOrigenObj),
        });
  
        if (response.ok) {
          const nuevaDenominacionAgregada = await response.json();
          setDenominacionDeOrigen((prevDenominacionDeOrigen) => [
            ...prevDenominacionDeOrigen,
            nuevaDenominacionAgregada,
          ]);
          fetchDenominacionDeOrigen();
          setNuevaDenominacionOrigen("");
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

 
  const handleDeleteDenominacionOrigen = async () => {    
    if (denominacionOrigenSelected) {
      mostrarMensajeConfirmacion('¿Quieres borrar este registro?', 'Esta acción no se puede deshacer', 'warning')
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`${apiUrl.denominacionDeOrigen}/${denominacionOrigenSelected.value}`, {
            method: "DELETE",
        })
        .then(() => {
          setDenominacionDeOrigen((prevDenominacionDeOrigen) => prevDenominacionDeOrigen.filter((option) => option.value !== denominacionOrigenSelected.value) );
          setDenominacionOrigenSelected(null);
          setNuevaDenominacionOrigen("");
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
            <span>Administración</span>
          </h2>
        </section>
        
        <div className="perfil-admin-content">

        <section>
            <h3>Denominación de origen</h3>
            <div className="select-container">
              <Select
                options={denominacionDeOrigen}
                value={denominacionOrigenSelected}
                onChange={setDenominacionOrigenSelected}
                placeholder="Denominación de origen"
              />
            </div>

            <div className="input-container">
              <input
                class="disabled"              
                type="text"
                placeholder="Denominación de origen seleccionada"
                value={denominacionOrigenSelected ? denominacionOrigenSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteDenominacionOrigen(denominacionOrigenSelected)}>Borrar</button>
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Nueva denominación de origen"
                value={nuevaDenominacionOrigen}
                onChange={(e) => setNuevaDenominacionOrigen(e.target.value)}
              />
              <button onClick={handleAddDenominacionOrigen}>Añadir</button>
            </div>

          </section>
        </div>

      </div>
    </div>
  );
};

export default DenominacionOrigenOptions;