import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import {
  mostrarMensaje,
  mostrarMensajeConfirmacion,
} from "../../../../utility/utils";
import Swal from "sweetalert2";

const BodegaOptions = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSelected, setBodegaSelected] = useState("");
  const [nuevaBodega, setNuevaBodega] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    cif: ""
  });

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
    }, 2000);
  }, []);

  const fetchBodegas = async () => {
    try {
      // Mostrar mensaje de cargando datos
      mostrarMensaje(
        "Cargando datos...",
        "Espere mientras se cargan los datos",
        "info"
      );

      const response = await fetch(apiUrl.bodegas);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((bodega) => ({
            value: bodega.id,
            label: bodega.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setBodegas(options);

        Swal.close();
      } else {
        console.error("No se encontraron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);

      // Mostrar mensaje de error
      mostrarMensaje(
        "Error al cargar los datos",
        "Ha ocurrido un error al cargar los datos",
        "error"
      );
    }
  };

  const handleAddBodega = async () => {
    if (
      nuevaBodega.nombre &&
      nuevaBodega.cif
    ) {
      const nuevaBodegaObj = {
        nombre: nuevaBodega.nombre,
        direccion: nuevaBodega.direccion,
        telefono: nuevaBodega.telefono,
        cif: nuevaBodega.cif
      };

      try {
        const response = await fetch(`${apiUrl.bodegas}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/ld+json",
          },
          body: JSON.stringify(nuevaBodegaObj),
        });

        if (response.ok) {
          const nuevaBodegaAgregada = await response.json();
          setBodegas((prevBodegas) => [...prevBodegas, nuevaBodegaAgregada]);

          fetchBodegas();

          setNuevaBodega({
            nombre: "",
            direccion: "",
            telefono: "",
            cif: ""
          });

          mostrarMensaje(
            "Registro añadido",
            "Registro añadido con éxito",
            "success"
          );
        } else {
          mostrarMensaje(
            "Error al añadir el registro",
            "Hubo un error al añadir el registro",
            "error"
          );
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje(
          "Error al añadir el registro",
          "Hubo un error al añadir el registro",
          "error"
        );
      }
    }
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
              setNuevaBodega("");

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
              />
            </div>

            <div className="input-container">
              <input
                className="disabled"
                type="text"
                placeholder="Bodega seleccionada"
                value={bodegaSelected ? bodegaSelected.label : ""}
                readOnly
              />
              <button
                className="delete-button"
                onClick={() => handleDeleteBodega(bodegaSelected)}
              >
                Borrar
              </button>
            </div>

            <div className="input-container input-bodega">
              <input
                type="text"
                placeholder="Nombre"
                value={nuevaBodega.nombre}
                onChange={(e) =>
                  setNuevaBodega({ ...nuevaBodega, nombre: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Dirección"
                value={nuevaBodega.direccion}
                onChange={(e) =>
                  setNuevaBodega({ ...nuevaBodega, direccion: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={nuevaBodega.telefono}
                onChange={(e) =>
                  setNuevaBodega({ ...nuevaBodega, telefono: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CIF"
                value={nuevaBodega.cif}
                onChange={(e) =>
                  setNuevaBodega({ ...nuevaBodega, cif: e.target.value })
                }
              />

              <button onClick={handleAddBodega}>Añadir</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BodegaOptions;
