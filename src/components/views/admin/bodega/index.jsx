import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import {
  mostrarMensaje,
  mostrarMensajeConfirmacion,
} from "../../../../utility/utils";
import Swal from "sweetalert2";
import AddBodega from "./add";
import EditBodega from "./add/edit";

const BodegaOptions = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSelected, setBodegaSelected] = useState("");


  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje(
      "Cargando datos...",
      "Espere mientras se cargan los datos",
      "info"
    );
    fetchBodegas();

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 3000);
  }, []);

  useEffect(() => {
    fetchBodegas();
  }, []);


  const fetchBodegas = async () => {
    try {
      const response = await fetch(apiUrl.bodegas);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((bodega) => ({
            value: bodega.id,
            label: bodega.nombre,
            nombre: bodega.nombre,
            direccion: bodega.direccion,
            telefono: bodega.telefono,
            cif: bodega.cif,
            web: bodega.web,
            password: bodega.password,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setBodegas(options);

        Swal.close();
      } else {
        console.error("No se encontraron datos.");
      }
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensaje(
        "Error al cargar los datos",
        "Ha ocurrido un error al cargar los datos",
        "error"
      );
    }
  };

  const handleEditBodega = (bodega) => {
    // Implement the functionality to edit the selected bodega here
    // Once the bodega is edited, you can call the setBodegas function to update the list of bodegas
    setBodegas((prevBodegas) => {
      const updatedBodegas = [...prevBodegas];
      const index = updatedBodegas.findIndex((b) => b.value === bodega.value);
      updatedBodegas[index] = bodega;
      return updatedBodegas;
    });
  };
  
  const handleDeleteBodega = async () => {
    if (bodegaSelected) {
      mostrarMensajeConfirmacion(
        "¿Quieres borrar este registro?",
        "Esta acción no se puede deshacer",
        "warning"
      ).then((result) => {
        if (result.isConfirmed) {
          fetch(`${apiUrl.bodegas}/${bodegaSelected.value}`, {
            method: "DELETE",
          })
            .then(() => {
              setBodegas((prevBodegas) =>
                prevBodegas.filter(
                  (option) => option.value !== bodegaSelected.value
                )
              );

              setBodegaSelected(null);

              mostrarMensaje(
                "Registro eliminado",
                "Registro eliminado con éxito",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error al eliminar el registro", error);
              mostrarMensaje(
                "Error al eliminar el registro",
                "Hubo un error al eliminar el registro",
                "error"
              );
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
            <h3>Bodega</h3>
            <div className="select-container">
              <Select
                options={bodegas}
                value={bodegaSelected}
                onChange={setBodegaSelected}
                placeholder="Bodegas"
                getOptionLabel={(option) => `${option.label} - ${option.cif}`}
              />
            </div>
            <EditBodega bodegaSelected={bodegaSelected} handleEditBodega={handleEditBodega} />
          </section>

          <section>
            <div>
                <AddBodega/>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BodegaOptions;
