import React, { useState, useEffect } from "react";
import TopMenu from "../../../menu";
import TablaVinosBodega from "../../bodega/list";
import { apiUrl } from "../../../../data/Url";
import Select from "react-select";
import { mostrarMensaje } from "../../../../utility/utils";

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

  const [comidas, setComidas] = useState([]);
  const [comidaSelected, setComidaSelected] = useState("");
  const [nuevaComida, setNuevaComida] = useState("");

  useEffect(() => {
    fetchVariedadesUva();
    fetchDenominacionDeOrigen();
    fetchTiposDeVino();
    fetchComidas();
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

  const handleAddDenominacionOrigen = async () => {
    if (nuevaDenominacionOrigen) {
      const nuevaDenominacionOrigenObj = {
        nombre: nuevaDenominacionOrigen,
      };
  
      try {
        const response = await fetch(`${apiUrl.denominacionDeOrigen}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/ld+json',
          },
          body: JSON.stringify(nuevaDenominacionOrigenObj),
        });
  
        if (response.ok) {
          const nuevaDenominacionAgregada = await response.json();
          setDenominacionDeOrigen((prevDenominacionDeOrigen) => [
            ...prevDenominacionDeOrigen,
            nuevaDenominacionAgregada,
          ]);
          fetchDenominacionDeOrigen();
          setNuevaDenominacionOrigen("");
          mostrarMensaje('Denominación de origen añadida', 'La nueva denominación de origen ha sido añadida con éxito', 'success');
        } else {
          mostrarMensaje('Error al añadir la denominación de origen', 'Hubo un error al añadir la denominación de origen', 'error');
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje('Error al añadir la denominación de origen', 'Hubo un error al añadir la denominación de origen', 'error');
      }
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
        nombre: nuevaVariedadUva,
      };
      setVariedadesUva((prevVariedadesUva) => [
        ...prevVariedadesUva,
        nuevaVariedadUvaObj,
      ]);
      setNuevaVariedadUva("");
    }
  };

  const handlDeleteVariedadUva = async () => {    
    if (variedadUvaSelected) {
      try {
        await fetch(`${apiUrl.variedadesUva}/${variedadUvaSelected.value}`, {
          method: "DELETE",
        });
        setVariedadesUva((prevVariedadesUva) =>
        prevVariedadesUva.filter((option) => option.value !== variedadUvaSelected.value)
        );
        setVariedadUvaSelected(null);
        setNuevaVariedadUva("");
      } catch (error) {
        console.error("Error al eliminar la variedad de uva:", error);
      }
    }
  };

  const fetchComidas = async () => {
    try {
      const response = await fetch(apiUrl.comidas);
      const data = await response.json();
      if (data && data["hydra:member"]) {
        const options = data["hydra:member"]
          .map((tipo) => ({
            value: tipo.id,
            label: tipo.nombre,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setComidas(options);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleAddComida = () => {
    if (nuevaComida) {
      const nuevaComidaObj = {
        nombre: nuevaComida,
      };
      setComidas((prevComidas) => [...prevComidas, nuevaComidaObj]);
      setNuevaComida("");
    }
    setNuevaComida("");
  };

  const handleDeleteComida = async () => {    
    if (comidaSelected) {
      try {
        await fetch(`${apiUrl.comidas}/${comidaSelected.value}`, {
          method: "DELETE",
        });
        setComidas((prevComidas) =>
        prevComidas.filter((option) => option.value !== comidaSelected.value)
        );
        setComidaSelected(null);
        setNuevaComida("");
      } catch (error) {
        console.error("Error al eliminar la comida", error);
      }
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

      <div className="perfil-admin-title">
        <section className="perfil-admin centrar">
          <h2 className="centrar">
            <span>Administrador</span>
          </h2>
        </section>
        
        <div className="perfil-admin-content">
          <section>
            <h3>Denominación de origen</h3>
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
                placeholder="Denominación de origen seleccionada"
                value={denominacionOrigenSelected ? denominacionOrigenSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteDenominacionOrigen(denominacionOrigenSelected)}>Borrar</button>
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

          </section>

          <section>
            <h3>Variedad de uva</h3>
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
                placeholder="Variedad de uva seleccionada"
                value={variedadUvaSelected ? variedadUvaSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handlDeleteVariedadUva(variedadUvaSelected)}>Borrar</button>
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
            <h3>Tipo de vino</h3>
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
                placeholder="Tipo de vino seleccionado"
                value={tipoVinoSelected ? tipoVinoSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteDenominacionOrigen(denominacionOrigenSelected)}>Borrar</button>
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
            <h3>Comida</h3>
            <div className="select-container">
              <Select
                options={comidas}
                value={comidaSelected}
                onChange={setComidaSelected}
                placeholder="Tipos de comida"
              />
            </div>
            
            <div className="input-container">
              <input
                type="text"
                placeholder="Tipo de vino seleccionado"
                value={comidaSelected ? comidaSelected.label : ""}
                readOnly
              />
              <button className="delete-button" onClick={() => handleDeleteComida(comidaSelected)}>Borrar</button>
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Nueva comida"
                value={nuevaComida}
                onChange={(e) => setNuevaComida(e.target.value)}
              />
              <button onClick={handleAddComida}>Añadir</button>
            </div>
          </section>
        </div>

        <section>
          <h3 className="perfil-admin-content">Vinos</h3>
          <TablaVinosBodega />
        </section>
      </div>
    </div>
  );
};

export default PerfilAdmin;