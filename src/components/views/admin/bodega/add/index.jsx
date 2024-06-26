import React, { useState, useEffect } from "react";
import { mostrarMensaje } from "../../../../../utility/utils";
import Swal from "sweetalert2";
import { apiUrl } from "../../../../../data/Url";
import MenuElementosAdmin from "../../menu";

const AddBodega = ({updateBodegas}) => {
  const [bodegas, setBodegas] = useState([]);

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

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
      Swal.close();
    }, 3000);
  }, []);

  const fetchBodegas = async () => {
    try {
      const response = await fetch(apiUrl.bodegas, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/ld+json',
      }
    });
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
        .filter((bodega) => bodega.cif !== "admin")
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

  const handleAddBodega = async (event) => {
    if (!nuevaBodega.nombre || !nuevaBodega.cif || !nuevaBodega.password) {
      mostrarMensaje(
        "Campos obligatorios",
        "Por favor, rellena los campos Nombre, CIF y Contraseña",
        "warning"
      );
      return;
    }
    event.preventDefault();
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

          updateBodegas();

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

  return (
    <div>
    <div className="perfil-admin-container">
        <section>
          <h3>Añadir nueva bodega</h3>
          <div className="input-container input-bodega">
            <input
              className="nombre input-bodega-nueva"
              type="text"
              placeholder="Nombre"
              value={nuevaBodega.nombre}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, nombre: e.target.value })
              }
            />
            <input
              className="direccion input-bodega-nueva"
              type="text"
              placeholder="Dirección"
              value={nuevaBodega.direccion}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, direccion: e.target.value })
              }
            />
            <input
              className="telefono input-bodega-nueva"
              type="text"
              placeholder="Teléfono"
              value={nuevaBodega.telefono}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, telefono: e.target.value })
              }
            />
            <input
              className="cif input-bodega-nueva"
              type="text"
              placeholder="CIF"
              value={nuevaBodega.cif}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, cif: e.target.value })
              }
            />
            <input
              className="web input-bodega-nueva"
              type="text"
              placeholder="Web"
              value={nuevaBodega.web}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, web: e.target.value })
              }
            />
            <input
              className="password input-bodega-nueva"
              type="password"
              placeholder="Contraseña"
              value={nuevaBodega.password}
              onChange={(e) =>
                setNuevaBodega({ ...nuevaBodega, password: e.target.value })
              }
            />
            <button onClick={handleAddBodega}>Añadir</button>
          </div>
        </section>
      </div>
      </div>

  );
};

export default AddBodega;
