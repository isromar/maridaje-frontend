import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { mostrarMensaje } from "../../../../utility/utils";
import Swal from "sweetalert2";
import TopMenu from "../../../menu";

function EditarVino() {
  let { vinoId } = useParams();
  const [vino, setVino] = useState(null);
  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");
  const [denominacionOrigenOptions, setDenominacionOrigenOptions] = useState([]);
  const [denominacionOrigenSelected, setDenominacionOrigenSelected] =
    useState("");
  const [vinoEcologicoSelected, setVinoEcologicoSelected] = useState("");

  const [vinoPrecio, setVinoPrecio] = useState([]);
  const [vinoPrecioSelected, setVinoPrecioSelected] = useState("");

  const [comidas, setComidas] = useState("");
  const [comidaSelected, setComidaSelected] = useState("");
  const opcionesVinoEcologico = [
    { value: "si", label: "sí" },
    { value: "no", label: "no" },
  ];
  const [variedadesUva, setVariedadesUva] = useState([]);
  const [variedadUvaSelected, setVariedadUvaSelected] =
    useState([]);

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

  const fetchDenominacionOrigen = async () => {
    try {
      const response = await fetch(apiUrl.denominacionDeOrigen);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((denominacion) => ({
            value: denominacion.id,
            label: denominacion.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
          setDenominacionOrigenOptions(options);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const fetchVariedadesUva = async () => {
    try {
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
        Swal.close(); // Cierra el mensaje una vez que se han cargado los datos
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const fetchComidas = async () => {
    try {
      mostrarMensaje('Cargando datos...', 'Espere mientras se cargan los datos', 'info');
      const response = await fetch(apiUrl.comidas);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((comida) => ({
            value: comida["@id"],
            label: comida.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setComidas(options);
        Swal.close(); // Cierra el mensaje una vez que se han cargado los datos
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    if (vinoId) {
      fetch(`${apiUrl.vinos}/${vinoId}`)
        .then((response) => response.json())
        .then((data) => setVino(data));
    }
  }, []);

  useEffect(() => {
    fetchTiposDeVino();
    fetchDenominacionOrigen();
    fetchVariedadesUva();
    fetchComidas();
  }, []);

  if (!vino) {
    return <div>Cargando...</div>;
  }

  const handleChange = (selectedOption, stateName) => {
    if (stateName === "tipoVinoSelected") {
      setTipoVinoSelected(selectedOption);
    } else if (stateName === "denominacionOrigenSelected") {
      setDenominacionOrigenSelected(selectedOption);
    } else if (stateName === "vinoEcologicoSelected") {
      setVinoEcologicoSelected(selectedOption);
    } else if (stateName === "variedadUvaSelected") {
        setVariedadUvaSelected(selectedOption);
    }
  };

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setVino((prevVino) => ({
      ...prevVino,
      [key]: value,
    }));
  };

  const saveData = async () => {
    try {
      // Preparar los datos a enviar
      const datosVinoObj = {
        nombre: vino.nombre,
        maduracion: vino.maduracion,
        tipoVino: tipoVinoSelected,
        denominacionOrigen: denominacionOrigenSelected,
        ecologico: vinoEcologicoSelected,
        precio: vinoPrecioSelected,
        variedad_uva: variedadUvaSelected.map(uva => uva.value),
        // Agrega aquí el resto de campos que quieras guardar
      };
  
      // Enviar los datos al servidor
      const response = await fetch(`${apiUrl.vinos}/${vinoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify(datosVinoObj),
      });
  
      if (response.ok) {
        // Mostrar un mensaje de éxito
        mostrarMensaje('Guardado', 'Los datos del vino se han guardado correctamente', 'success');
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

        // Actualizar el estado del vino con los nuevos valores
        const updatedVino = await response.json();
        setVino(updatedVino);
      } else {
        // Mostrar un mensaje de error
        mostrarMensaje('Error', 'Ha ocurrido un error al guardar los datos', 'error');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      mostrarMensaje('Error', 'Ha ocurrido un error al guardar los datos', 'error');
    }
  };

  return (
    <div>
    <div>
      <TopMenu/>
    </div>
    <form className="view">
      <section className="vino-view">
        <h2 className="centrar">
          <span>Vino - {vino.nombre} </span>
        </h2>
        <button className="btn-editar-vino btn btn-light" onClick={saveData}>Guardar</button>
        <table className="tabla-view">
          <tr>
            <td>Tipo de vino:</td>
            <td>
              <Select
                value={tipoVinoSelected}
                onChange={(tipoVinoSelected) =>
                  handleChange(tipoVinoSelected, "tipoVinoSelected")
                }
                options={tiposDeVino}
                placeholder={vino.tipoVino.nombre}
              />
            </td>
          </tr>

          <tr>
            <td>Maduración:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.maduracion}
                onChange={(event) => handleInputChange(event, 'maduracion')}
              />
            </td>
          </tr>

          <tr>
            <td>Denominación de origen:</td>
            <td>
              <Select
                value={denominacionOrigenSelected || ""}
                onChange={(denominacionOrigenSelected) =>
                  handleChange(
                    denominacionOrigenSelected,
                    "denominacionOrigenSelected"
                  )
                }
                options={denominacionOrigenOptions}
                placeholder={vino.denominacionOrigen.nombre || ""}
              />
            </td>
          </tr>

          <tr>
            <td>Ecológico:</td>
            <td>
              <Select
                value={vinoEcologicoSelected}
                onChange={(vinoEcologicoSelected) =>
                  handleChange(vinoEcologicoSelected, "vinoEcologicoSelected")
                }
                options={opcionesVinoEcologico}
                placeholder={vino.ecologico}
              />
            </td>
          </tr>

          <tr>
            <td>Precio:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={`${vino.precio} €`}
                onChange={(event) => handleInputChange(event, 'precio')}
              />
            </td>
          </tr>


          <tr>
            <td>Marida con:</td>
            <td>
              <Select
                isMulti
                value={vino.comida.map(comida => ({ value: comida.id, label: comida.nombre }))}
                onChange={(selectedOptions) => setComidaSelected(selectedOptions)}
                options={comidas}
                placeholder={vino.comida && vino.comida.length > 0
                  ? [
                      {
                        value: vino.comida[0].id,
                        label: vino.comida[0].nombre
                      }
                    ]
                  : ""
                }
              />
            </td>
          </tr>

          <tr>
            <td>Variedad de uva:</td>
            <td>
            <Select
                isMulti
                value={vino.variedad_uva.map(uva => ({ value: uva.id, label: uva.nombre }))}
                onChange={(selectedOptions) =>
                  //setVariedadUvaSelected(selectedOptions)
                  handleChange("variedadUvaSelected", selectedOptions)
                }
                options={variedadesUva}
                placeholder={vino.variedad_uva && vino.variedad_uva.length > 0
                  ? [
                      {
                        value: vino.variedad_uva[0].id,
                        label: vino.variedad_uva[0].nombre
                      }
                    ]
                  : ""
              }
              />
            </td>
          </tr>

        </table>
      </section>

      <section className="bodega-view">
        <h4 className="centrar">
          <span>Bodega - {vino.bodega.nombre} </span>
        </h4>
        <table className="tabla-view">
          <tr>
            <td>Dirección:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.direccion}
              />
            </td>
          </tr>

          <tr>
            <td>Teléfono:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.telefono}
              />
            </td>
          </tr>

          <tr>
            <td>CIF:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.cif}
              />
            </td>
          </tr>

          <tr>
            <td>Web:</td>
            <td>
              <input
                type="text"
                className="form-control "
                value={vino.bodega.web}
              />
            </td>
          </tr>
        </table>
      </section>
    </form>
    </div>
  );
}

export default EditarVino;
