import React, { useState, useEffect } from "react"; // Importa useState y useEffect
import { apiUrl } from "../../../../data/Url";
import { useParams } from "react-router-dom";
import { mostrarMensaje } from "../../../../utility/utils";
import Swal from "sweetalert2";
import TopMenu from "../../../menu";
import Select from "react-select";

function EditarVino() {
  const { bodegaId } = useParams();

  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [denominacionOrigen, setDenominacionOrigen] = useState([]);
  const opcionesVinoEcologico = [
    { value: "si", label: "sí" },
    { value: "no", label: "no" },
  ];
  const [comidas, setComidas] = useState([]);
  const [nuevoVinoComidas, setNuevoVinoComidas] = useState([]);
  const [hayComidasEnElInput, setHayComidasEnElInput] = useState(0);
  const [variedadesUva, setVariedadesUva] = useState([]);
  const [nuevoVinoVariedadUvas, setNuevoVinoVariedadUvas] = useState([]);
  const [nuevoVino, setNuevoVino] = useState({
    bodega: "",
    nombre: "",
    tipoVino: "",
    maduracion: "",
    ecologico: "",
    precio: "",
    denominacionOrigen: "",
  });


  

  let { vinoId } = useParams();
  const [vino, setVino] = useState(null);
  const [editVino, setEditVino] = useState(null);

 
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");

  const [denominacionOrigenOptions, setDenominacionOrigenOptions] = useState([]);
  const [denominacionOrigenSelected, setDenominacionOrigenSelected] =
    useState("");

  const [vinoPrecio, setVinoPrecio] = useState([]);
  const [vinoPrecioSelected, setVinoPrecioSelected] = useState("");


  const [comidaSelected, setComidaSelected] = useState("");

  const [vinoEcologicoSelected, setVinoEcologicoSelected] = useState("");

  const [variedadUvaSelected, setVariedadUvaSelected] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
        mostrarMensaje(
            "Cargando datos...",
            "Espere mientras se cargan los datos",
            "info"
        );

        await Promise.all([
            fetchTiposDeVino(),
            fetchDenominacionDeOrigen(),
            fetchComidas(),
            fetchVariedadesUva()
        ]);

        if (isMounted) {
            // Cerrar el mensaje después de completar todas las solicitudes
            Swal.close();
        }
    };

    fetchData();

    return () => {
        isMounted = false;
    };
}, []);

  useEffect(() => {
    if (vinoId) {
      fetch(`${apiUrl.vinos}/${vinoId}`)
        .then((response) => response.json())
        .then((data) => {
          setVino(data);
        });
      }
  }, []);

  useEffect(() => {
    if (vino) {
      setNuevoVino({
        bodega: vino.bodega,
        nombre: vino.nombre,
        tipoVino: vino.tipoVino,
        maduracion: vino.maduracion,
        ecologico: vino.ecologico,
        precio: vino.precio,
        denominacionOrigen: vino.denominacionOrigen,
      });
    }
  }, [vino]);


  const fetchDenominacionDeOrigen = async () => {
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

  const handleChange = (selectedOption, stateName) => {
    if (stateName === "tipoVinoSelected") {
      setNuevoVino({ ...nuevoVino, tipoVino: selectedOption });
    } else if (stateName === "denominacionOrigenSelected") {
      setNuevoVino({
        ...nuevoVino,
        denominacionOrigen: selectedOption,
      });
    } else if (stateName === "vinoEcologicoSelected") {
      setNuevoVino({
        ...nuevoVino,
        ecologico: selectedOption.value,
      });
    } else if (stateName === "comidasSelected") {
      setHayComidasEnElInput(1);
      setNuevoVinoComidas(selectedOption.map((option) => option.value));
    } else if (stateName === "variedadUvaSelected") {
      setNuevoVinoVariedadUvas(selectedOption.map((option) => option.value));
    }
  };

  const handleSubmit = async (event) => {
    if (!nuevoVino.nombre || !nuevoVino.tipoVino) {
      mostrarMensaje(
        "Campos obligatorios",
        "Por favor, rellena los campos Nombre, Tipo de Vino y Marida con",
        "warning",
        4000
      );
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const bodegaIri = `${apiUrl.bodegas}/${bodegaId}`;
    const tipoVinoIri = `${apiUrl.tiposDeVino}/${nuevoVino.tipoVino.value}`;
    let denominacionOrigenIri = null;
    if (nuevoVino.denominacionOrigen && nuevoVino.denominacionOrigen.value) {
      denominacionOrigenIri = `${apiUrl.denominacionDeOrigen}/${nuevoVino.denominacionOrigen.value}`;
    }
    const comidasIris = nuevoVinoComidas.map(
      (comidaId) => `${apiUrl.comidas}/${comidaId}`
    );
    const variedadUvasIris = nuevoVinoVariedadUvas.map(
      (variedadUvaId) => `${apiUrl.variedadesUva}/${variedadUvaId}`
    );

    const nuevoVinoCompleto = {
      ...nuevoVino,
      bodega: bodegaIri,
      nombre: nuevoVino.nombre,
      tipoVino: tipoVinoIri,
      maduracion: nuevoVino.maduracion,
      precio: parseFloat(nuevoVino.precio),
      denominacionOrigen: denominacionOrigenIri,
      ecologico: nuevoVino.ecologico === "si" ? true : false,
      comida: comidasIris,
      variedadUva: variedadUvasIris,
    };

    try {
      const response = await fetch(apiUrl.vinos/vinoId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(nuevoVinoCompleto),
      });

      if (response.ok) {
        // Crear las relaciones entre el vino y las comidas seleccionadas
        const data = await response.json();
        //const vinoId = data["@id"].split("/").pop();

        mostrarMensaje(
          "Vino creado",
          "El vino se ha creado con éxito",
          "success"
        )
        .then(data => console.log(data))

        // Restablecer el formulario después de la creación exitosa
        setNuevoVino({
          nombre: "",
          tipoVino: "",
          maduracion: "",
          ecologico: "no",
          precio: 0,
          denominacionOrigen: null,
        });


      } else {
        mostrarMensaje("Error", "Hubo un error al crear el vino", "error");
      }
    } catch (error) {
      mostrarMensaje("Error", "Hubo un error al crear el vino", "error");
    }
  };




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



  if (!vino) {
    return <div>Cargando...</div>;
  }

  const handleInputChange = (event, key) => {
    const value = event.target.value;
    setVino((prevVino) => ({
      ...prevVino,
      [key]: value,
    }));
  };

  return (
    <div>
      <div>
        <TopMenu />
      </div>
      <form className="view" id="form-nuevo-vino" onSubmit={handleSubmit}>
        <section className="view">
          <h2 className="centrar">Editar Vino - {vino.nombre}</h2>
          <button type="submit" className="btn btn-light button-guardar">
              Guardar vino
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
                  placeholder="Nombre"
                />
              </td>
            </tr>

            <tr>
              <td>Tipo de vino:</td>
              <td>
                <Select
                  type="text"
                  value={nuevoVino.tipoVino.label}
                  placeholder={vino && vino.tipoVino ? vino.tipoVino.nombre : "Selecciona..."}
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
                  placeholder={vino.maduracion || ""}
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
              <td>
                <Select
                  type="text"
                  value={nuevoVino.denominacionOrigen.nombre || ""}
                  placeholder={vino && vino.denominacionOrigen ? vino.denominacionOrigen.nombre : "Selecciona..."}
                  onChange={(denominacionOrigenSelected) =>
                    handleChange(
                      denominacionOrigenSelected,
                      "denominacionOrigenSelected"
                    )
                  }
                  options={denominacionOrigen}
                />
              </td>
            </tr>

            <tr>
              <td>Ecológico:</td>
              <td>
                <Select
                  type="text"
                  placeholder={vino.ecologico}
                  value={opcionesVinoEcologico.find(
                    (opcion) => opcion.value === nuevoVino.ecologico
                  )}
                  onChange={(selectedOption) =>
                    setNuevoVino({
                      ...nuevoVino,
                      ecologico: selectedOption.value,
                    })
                  }
                  options={opcionesVinoEcologico}
                />
              </td>
            </tr>

            <tr>
              <td>Precio:</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={nuevoVino.precio || 0}
                  onChange={(e) =>
                    setNuevoVino({ ...nuevoVino, precio: e.target.value })
                  }
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
      </form>
    </div>
  );
}

export default EditarVino;
