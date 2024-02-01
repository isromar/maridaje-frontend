import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from "react-router-dom";
import Select from "react-select";

function EditarVino() {
  let { vinoId } = useParams();
  const [vino, setVino] = useState(null);
  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");
  const [denominacionOrigen, setDenominacionOrigen] = useState([]);
  const [denominacionOrigenSelected, setDenominacionOrigenSelected] =
    useState("");
  const [vinoEcologicoSelected, setVinoEcologicoSelected] = useState("");
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
        setDenominacionOrigen(options);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const fetchVariedadesUva = async () => {
    try {
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
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    // Aquí deberías hacer una solicitud a tu API o base de datos para obtener los datos del vino por su ID
    // Por ejemplo, con fetch o axios
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
    }
  };

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setVino((prevVino) => ({
      ...prevVino,
      [key]: value,
    }));
  };

  return (
    <form className="view">
      <section className="vino-view">
        <h2 className="centrar">
          <span>Vino - {vino.nombre} </span>
        </h2>
        <table className="tabla-view">
          <tr>
            <td>Tipo de Vino:</td>
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
              />
            </td>
          </tr>

          <tr>
            <td>Denominación de origen:</td>
            <td>
              <Select
                value={denominacionOrigenSelected}
                onChange={(denominacionOrigenSelected) =>
                  handleChange(
                    denominacionOrigenSelected,
                    "denominacionOrigenSelected"
                  )
                }
                options={denominacionOrigen}
                placeholder={vino.denominacionOrigen.nombre}
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
            <td>Marida con:</td>
            <td>
              <span>
                {vino.comida
                  .sort((a, b) => a.nombre.localeCompare(b.nombre)) // Ordenar alfabéticamente
                  .map((itemComida, index) => {
                    return (
                      <span key={itemComida["@id"]}>
                        {itemComida.nombre}
                        {index < vino.comida.length - 1 && ", "}
                      </span>
                    );
                  })}
              </span>
            </td>
          </tr>

          <tr>
            <td>Variedad de uva:</td>
            <td>
            <Select
                isMulti
                value={vino.variedad_uva.map(uva => ({ value: uva.id, label: uva.nombre }))}
                onChange={(selectedOptions) =>
                  setVariedadUvaSelected(selectedOptions)
                }
                options={variedadesUva}
                placeholder={[
                  {
                    value: vino.variedad_uva[0]["@id"].split("/").pop(),
                    label: vino.variedad_uva[0].nombre
                  }
                ]}

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
                value={vino.bodega.cif}
              />
            </td>
          </tr>
        </table>
      </section>
    </form>
  );
}

export default EditarVino;
