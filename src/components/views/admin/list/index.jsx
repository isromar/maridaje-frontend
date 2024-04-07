import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import TablaVinosBodega from "../../bodega/list";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";

const PerfilAdmin = () => {
  const [variedadesUva, setVariedadesUva] = useState([]);
  const [variedadUvaSelected, setVariedadUvaSelected] = useState(null);
  const [nuevaVariedadUva, setNuevaVariedadUva] = useState("");

  const [denominacionDeOrigen, setDenominacionDeOrigen] = useState([]);
  const [denominacionOrigenSelected, setDenominacionOrigenSelected] = useState(null);
  const [nuevaDenominacionOrigen, setNuevaDenominacionOrigen] = useState("");

  const [tiposDeVino, setTiposDeVino] = useState([]);
  const [tipoVinoSelected, setTipoVinoSelected] = useState("");
  const [nuevoTipoVino, setNuevoTipoVino] = useState("");

  useEffect(() => {
    fetchVariedadesUva();
    fetchDenominacionDeOrigen();
    fetchTiposDeVino();
  }, []);


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
          setDenominacionDeOrigen(options);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleAddDenominacionOrigen = () => {
    if (nuevaDenominacionOrigen) {
      const nuevaDenominacionOrigenObj = {
        id: Date.now(),
        nombre: nuevaDenominacionOrigen,
      };
      setDenominacionDeOrigen((prevDenominacionDeOrigen) => [
        ...prevDenominacionDeOrigen,
        nuevaDenominacionOrigenObj,
      ]);
      setNuevaDenominacionOrigen("");
    }
  };

  const handleDeleteDenominacionOrigen = async () => {
    if (denominacionOrigenSelected) {
      try {
        await fetch(`${apiUrl.denominacionDeOrigen}/${denominacionOrigenSelected.value}`, {
          method: "DELETE",
        });
        setDenominacionDeOrigen((prevDenominacionDeOrigen) =>
          prevDenominacionDeOrigen.filter((option) => option.value !== denominacionOrigenSelected.value)
        );
        setDenominacionOrigenSelected(null);
        setNuevaDenominacionOrigen("");
      } catch (error) {
        console.error("Error al eliminar la denominación de origen:", error);
      }
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

  const handleAddVariedadUva = () => {
    if (nuevaVariedadUva) {
      const nuevaVariedadUvaObj = {
        id: Date.now(),
        nombre: nuevaVariedadUva,
      };
      setVariedadesUva((prevVariedadesUva) => [
        ...prevVariedadesUva,
        nuevaVariedadUvaObj,
      ]);
      setNuevaVariedadUva("");
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

  const handleAddTipoVino = () => {
    if (nuevoTipoVino) {
      const nuevoTipoVinoObj = {
        id: Date.now(),
        nombre: nuevoTipoVino,
      };
      setTiposDeVino((prevTiposDeVino) => [...prevTiposDeVino, nuevoTipoVinoObj]);
      setNuevoTipoVino("");
    }
  };

  return (
    <div className="perfil-admin-container">
      <div>
        <TopMenu />
      </div>
      <div className="perfil-admin-content">
        <section className="perfil-admin centrar">
          <h2 className="centrar">
            <span>Administrador</span>
          </h2>
        </section>
        
        <section>
          <h2>Denominación de origen</h2>
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
              type="text"
              placeholder="Nueva denominación de origen"
              value={nuevaDenominacionOrigen}
              onChange={(e) => setNuevaDenominacionOrigen(e.target.value)}
            />
            <button onClick={handleAddDenominacionOrigen}>Añadir</button>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Denominación de origen seleccionada"
              value={denominacionOrigenSelected ? denominacionOrigenSelected.label : ""}
              readOnly
            />
            <button onClick={() => handleDeleteDenominacionOrigen(denominacionOrigenSelected)}>Borrar</button>
          </div>
        </section>

        <section>
          <h2>Variedades de uva</h2>
          <div className="select-container">
            <Select
              options={variedadesUva}
              value={variedadUvaSelected}
              onChange={setVariedadUvaSelected}
              placeholder="Variedades de uva"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nueva variedad de uva"
              value={nuevaVariedadUva}
              onChange={(e) => setNuevaVariedadUva(e.target.value)}
            />
            <button onClick={handleAddVariedadUva}>Añadir</button>
          </div>
        </section>

        <section>
          <h2>Tipos de vino</h2>
          <div className="select-container">
            <Select
              options={tiposDeVino}
              value={tipoVinoSelected}
              onChange={setTipoVinoSelected}
              placeholder="Tipos de vino"
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nuevo tipo de vino"
              value={nuevoTipoVino}
              onChange={(e) => setNuevoTipoVino(e.target.value)}
            />
            <button onClick={handleAddTipoVino}>Añadir</button>
          </div>
        </section>

        <section>
          <TablaVinosBodega />
        </section>
      </div>
    </div>
  );
};

export default PerfilAdmin;