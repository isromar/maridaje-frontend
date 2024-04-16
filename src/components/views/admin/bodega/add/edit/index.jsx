import React, { useState } from "react";

const EditBodega = ({ bodegaSelected, handleEditBodega }) => {
    const [editedBodega, setEditedBodega] = useState({
      nombre: bodegaSelected ? bodegaSelected.nombre : "",
      direccion: bodegaSelected ? bodegaSelected.direccion : "",
      telefono: bodegaSelected ? bodegaSelected.telefono : "",
      cif: bodegaSelected ? bodegaSelected.cif : "",
      web: bodegaSelected ? bodegaSelected.web : "",
      password: bodegaSelected ? bodegaSelected.password : "",
    });
  
    const handleChange = (e) => {
      setEditedBodega({
        ...editedBodega,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleEditBodega(editedBodega);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="nombre"
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={editedBodega.nombre}
          onChange={handleChange}
        />
        <input
          className="direccion"
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={editedBodega.direccion}
          onChange={handleChange}
        />
        <input
          className="telefono"
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={editedBodega.telefono}
          onChange={handleChange}
        />
        <input
          className="cif"
          type="text"
          name="cif"
          placeholder="CIF"
          value={editedBodega.cif}
          onChange={handleChange}
        />
        <input
          className="web"
          type="text"
          name="web"
          placeholder="Web"
          value={editedBodega.web}
          onChange={handleChange}
        />
        <input
          className="password"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={editedBodega.password}
          onChange={handleChange}
        />
        <button type="submit">Modificar</button>
      </form>
    );
  };

  export default EditBodega;