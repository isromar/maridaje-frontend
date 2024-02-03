import React, { useState } from "react";
import { comprobarLogin } from "../../utility/getData";
import { mostrarMensaje } from "../../utility/utils";

const BarraNavegacion = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleUsuarioChange = (event) => {
    setUsuario(event.target.value);
    localStorage.setItem("usuario", event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await comprobarLogin(usuario);
    console.log(data)
    if (1) {
      mostrarMensaje('Error', 'El usuario es incorrecto', 'error');
    } else {
      // Realizar acciones en función de la respuesta, por ejemplo, redirigir si el usuario es válido
    }
  };

  return (
    <div className="barra-navegacion">
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Usuario" value={usuario} onChange={handleUsuarioChange} />
        <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default BarraNavegacion;