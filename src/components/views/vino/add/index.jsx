import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from "react-router-dom";
import { mostrarMensaje } from "../../../../utility/utils";
import Swal from "sweetalert2";
import TopMenu from "../../../menu";
import Select from "react-select";

function NuevoVino() {
  const { bodegaId } = useParams();

  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");

  const [vinoEcologicoSelected, setVinoEcologicoSelected] = useState("");
  const opcionesVinoEcologico = [
    { value: "si", label: "sí" },
    { value: "no", label: "no" },
  ];

  const [nuevoVino, setNuevoVino] = useState({
    bodegaId: "",
    nombre: "",
    tipoVino: "",
    maduracion: "",
    ecologico: false, // Inicializa la propiedad "ecologico" con el valor "false"
    precio: 0,
  });
  

  useEffect(() => {
    fetchTiposDeVino();
  }, []);

  const fetchTiposDeVino = async () => {
    try {
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
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleChange = (selectedOption, stateName) => {
    if (stateName === "tipoVinoSelected") {
      setNuevoVino({ ...nuevoVino, tipoVino: selectedOption });
    }
  };

  const handleSubmit = async (event) => {
    if (!nuevoVino.nombre || !nuevoVino.tipoVino) {
      mostrarMensaje(
        "Campos obligatorios",
        "Por favor, rellena los campos Nombre, Tipo de Vino y Contraseña",
        "warning",
        4000,
      );
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const bodegaIri = `${apiUrl.bodegas}/${bodegaId}`;
    const tipoVinoIri = `${apiUrl.tiposDeVino}/${nuevoVino.tipoVino.value}`;

    const nuevoVinoCompleto = {
      ...nuevoVino,
      bodega: bodegaIri,
      nombre: nuevoVino.nombre,
      tipoVino: tipoVinoIri,
      maduracion: nuevoVino.maduracion,
      precio: parseFloat(nuevoVino.precio),
    };
    console.log(nuevoVinoCompleto);

    try {
      const response = await fetch(apiUrl.vinos, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(nuevoVinoCompleto),
      });

      if (response.ok) {
        mostrarMensaje(
          "Vino creado",
          "El vino se ha creado con éxito",
          "success"
        );
        // Restablecer el formulario después de la creación exitosa
        setNuevoVino({
          bodegaId: "",
          nombre: "",
          tipoVino: "",
          maduracion: "",
          denominacionOrigen: "",
          ecologico: false,
          precio: "",
          variedadUva: "",
          comida: "",
        });
      } else {
        mostrarMensaje("Error", "Hubo un error al crear el vino", "error");
      }
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error", "Hubo un error al crear el vino", "error");
    }
  };

  return (
    <div>
      <div>
        <TopMenu />
      </div>
      <form className="view" onSubmit={handleSubmit}>
        <section className="view">
          <h2 className="centrar">Nuevo Vino</h2>
          <button type="submit" className="btn btn-primary">
            Crear Vino
          </button>
          <table className="tabla-view">
            <tr>
              <td>Nombre:</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoVino.nombre}
                  onChange={(e) =>
                    setNuevoVino({ ...nuevoVino, nombre: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Tipo de vino:</td>
              <td>
                <Select
                  type="text"
                  placeholder="Selecciona..."
                  value={nuevoVino.tipoVino}
                  onChange={(tipoVinoSelected) =>
                    handleChange(tipoVinoSelected, "tipoVinoSelected")
                  }
                  options={tiposDeVino}
                />
              </td>
            </tr>

            <tr>
              <td>Maduración:</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoVino.maduracion}
                  onChange={(e) =>
                    setNuevoVino({ ...nuevoVino, maduracion: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Denominación de origen:</td>
              <td></td>
            </tr>

            <tr>
              <td>Ecológico:</td>
              <td>
                <Select
                  value={nuevoVino.ecologico}
                  defaultValue={nuevoVino.ecologico} // Establece el valor inicial del componente
                  onChange={(vinoEcologicoSelected) =>
                    handleChange(vinoEcologicoSelected, "vinoEcologicoSelected")
                  }
                  options={opcionesVinoEcologico}
                  placeholder="Selecciona..."
                />
              </td>
            </tr>

            <tr>
              <td>Precio:</td>
              <td>
                <input
                  className="form-control"
                  value={nuevoVino.precio}
                  placeholder="0"
                  onChange={(e) =>
                    setNuevoVino({ ...nuevoVino, precio: e.target.value })
                  }
                />
              </td>
            </tr>

            <tr>
              <td>Marida con:</td>
              <td></td>
            </tr>

            <tr>
              <td>Variedad de uva:</td>
              <td></td>
            </tr>
          </table>
        </section>
      </form>
    </div>
  );
}

export default NuevoVino;
