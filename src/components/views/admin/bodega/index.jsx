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

const BodegaOptions = () => {
  const [bodegas, setBodegas] = useState([]);
  const [bodegaSelected, setBodegaSelected] = useState("");
  const [editedBodega, setEditedBodega] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    cif: "",
    web: "",
    password: "",
  });

  const [nuevaBodega, setNuevaBodega] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    cif: "",
    web: "",
    password: "",
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
    }, 3000);
  }, []);

  useEffect(() => {
    fetchBodegas();
  }, [editedBodega, nuevaBodega]);

  const updateBodegas = () => {
    fetchBodegas();
  };

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

  const handleEditBodega = async () => {
    if (bodegaSelected && bodegaSelected.nombre && bodegaSelected.cif) {
      const updatedBodega = {
        ...bodegaSelected,
        nombre: editedBodega.nombre || bodegaSelected.nombre,
        direccion: editedBodega.direccion || bodegaSelected.direccion,
        telefono: editedBodega.telefono || bodegaSelected.telefono,
        cif: editedBodega.cif || bodegaSelected.cif,
        web: editedBodega.web || bodegaSelected.web,
        password: editedBodega.password || bodegaSelected.password,
      };

      try {
        const response = await fetch(
          `${apiUrl.bodegas}/${bodegaSelected.value}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(updatedBodega),
          }
        );

        if (response.ok) {
          const updatedBodegaAgregada = await response.json();
          setBodegas((prevBodegas) =>
            prevBodegas.map((option) =>
              option.value === bodegaSelected.value
                ? updatedBodegaAgregada
                : option
            )
          );

          setEditedBodega({
            nombre: "",
            direccion: "",
            telefono: "",
            cif: "",
            web: "",
            password: "",
          });

          setBodegaSelected({
            nombre: "",
            direccion: "",
            telefono: "",
            cif: "",
            web: "",
            password: "",
          });

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
    }
  };
  
  const handleAddBodega = async () => {
    if (nuevaBodega.nombre && nuevaBodega.cif && nuevaBodega.password) {
      const nuevaBodegaObj = {
        nombre: nuevaBodega.nombre,
        direccion: nuevaBodega.direccion,
        telefono: nuevaBodega.telefono,
        cif: nuevaBodega.cif,
        web: nuevaBodega.web,
        password: nuevaBodega.password,
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
            cif: "",
            web: "",
            password: "",
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
              getOptionLabel={(option) => `${option.label} - ${option.cif}`}
            />
            </div>

            <div className="input-container">
              <input
                className="disabled"
                type="text"
                placeholder="Bodega seleccionada"
                value={bodegaSelected ? `${bodegaSelected.label} - ${bodegaSelected.cif}` : ""}
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
                className="nombre"
                type="text"
                placeholder="Nombre"
                value={bodegaSelected ? bodegaSelected.nombre : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    nombre: e.target.value,
                  })
                }
              />
              <input
                className="direccion"
                type="text"
                placeholder="Dirección"
                value={bodegaSelected ? bodegaSelected.direccion : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    direccion: e.target.value,
                  })
                }
              />
              <input
                className="telefono"
                type="text"
                placeholder="Teléfono"
                value={bodegaSelected ? bodegaSelected.telefono : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    telefono: e.target.value,
                  })
                }
              />
              <input
                className="cif"
                type="text"
                placeholder="CIF"
                value={bodegaSelected ? bodegaSelected.cif : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    cif: e.target.value,
                  })
                }
              />
              <input
                className="web"
                type="text"
                placeholder="Web"
                value={bodegaSelected ? bodegaSelected.web : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    web: e.target.value,
                  })
                }
              />
              <input
                className="password"
                type="password"
                placeholder="Contraseña"
                value={bodegaSelected ? bodegaSelected.password : ""}
                onChange={(e) =>
                  setBodegaSelected({
                    ...bodegaSelected,
                    password: e.target.value,
                  })
                }
              />      

              <button onClick={handleEditBodega}>Modificar</button>
            </div>
          </section>

          <section>
            <div>
                <AddBodega updateBodegas={updateBodegas} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BodegaOptions;
