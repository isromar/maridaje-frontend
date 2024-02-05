import React, { useState, useEffect } from "react";
import { comprobarLogin } from "../../utility/getData";
import { mostrarMensaje } from "../../utility/utils";
import Swal from "sweetalert2";

const BarraNavegacion = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [acceso, setAcceso] = useState(false);

  useEffect(() => {
    const accesoLocalStorage = localStorage.getItem("acceso");
    if (accesoLocalStorage) {
      setAcceso(accesoLocalStorage === "true");
    }
  }, [acceso]);
  
  const handleUsuarioChange = (event) => {
      setUsuario(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await comprobarLogin(usuario); // Llama a la función que comprueba si existe ese usuario en la bbdd 
    console.log(data);
    if (usuario === "" && (contrasena !== "" || contrasena === '')) {
    } else {
        if (data && data["hydra:member"].length > 0) {
            const options = data["hydra:member"].map((bodega) => ({
            value: bodega.id,
            label: bodega.cif,
            name: bodega.nombre  // Obtener el nombre de la bodega
            }));
            if (options[0].label === usuario) {
            mostrarMensaje("Acceso correcto", `Te damos la bienvenida ${options[0].name}`, "success");
            localStorage.setItem("usuario", usuario);
            setAcceso(true)
            localStorage.setItem("acceso", true);
            setTimeout(() => {
                // Cerrar el mensaje después de 3 segundos
                Swal.close();
            }, 3000);
            }
        } else {
            mostrarMensaje(
            "Error de acceso",
            "La bodega no está registrada",
            "error"
            );
            setAcceso(false)
            setTimeout(() => {
            // Cerrar el mensaje después de 3 segundos
            Swal.close();
            }, 4000);
      }
    }
  };

  return (
    <div className="barra-navegacion">
        {acceso && <a href="#">Perfil bodega</a>}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder={"Usuario"}
          value={usuario}
          onChange={handleUsuarioChange}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default BarraNavegacion;
