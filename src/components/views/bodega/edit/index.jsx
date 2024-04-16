import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import { apiUrl } from "../../../../data/Url";
import {
  mostrarMensaje,
} from "../../../../utility/utils";
import Swal from "sweetalert2";
import { getDataPerfilBodega } from "../../../../utility/getData";

const EditarBodega = () => {
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


  useEffect(() => {
    // Mostrar mensaje de cargando datos
    mostrarMensaje(
      "Cargando datos...",
      "Espere mientras se cargan los datos",
      "info"
    );
    fetchBodegaData();

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 3000);
  }, []);

  const fetchBodegaData = async () => {
    const bodegaId = localStorage.getItem("bodegaId");
    if (bodegaId) {
      const response = await fetch(apiUrl.bodegas);
      const data = await response.json();
      
      const bodega = data["hydra:member"].find((bodega) => bodega.id === parseInt(bodegaId));
  
      if (bodega) {
        const label = bodega.nombre;
        const value = bodega.id;
        const option = { value, label };
        setBodegaSelected(bodega);
      } else {
        console.error("No se encontró la bodega con el ID especificado.");
      }
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
          `${apiUrl.bodegas}/${bodegaSelected.id}`,
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
          setBodegaSelected(updatedBodegaAgregada);

          setEditedBodega({
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

        </div>
      </div>
    </div>
  );
};

export default EditarBodega;
