import React, { useState, useEffect } from "react";
import { comprobarLogin } from "../../utility/getData";
import { mostrarMensaje } from "../../utility/utils";
import Swal from "sweetalert2";
import TopMenu from "../menu";
//import { useHistory } from "react-router-dom";

const BarraNavegacion = () => {
  //const history = useHistory();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [acceso, setAcceso] = useState(false);
  const [admin, setAdmin] = useState(false);
  

  useEffect(() => {
    const accesoLocalStorage = localStorage.getItem("acceso");
    if (accesoLocalStorage) {
      setAcceso(accesoLocalStorage === "true");
    }
  }, [acceso]);
  
  const handleUsuarioChange = (event) => {
      setUsuario(event.target.value);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    localStorage.removeItem("usuario");
    localStorage.removeItem("bodegaId");
    localStorage.removeItem("acceso");
    localStorage.removeItem("admin");
    window.location.reload();
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
            name: bodega.nombre,  // Obtener el nombre de la bodega
            bodegaId: bodega.id
            }));

            if (options[0].label === usuario) {
              mostrarMensaje("Acceso correcto", `Te damos la bienvenida ${options[0].name}`, "success");
              localStorage.setItem("usuario", usuario);
              setAcceso(true);

              localStorage.setItem("bodegaId", options[0].bodegaId);

              localStorage.setItem("acceso", true);

              // Redirigir a la URL de la bodega después del acceso correcto
              //history.push(`/perfil-bodega/${options[0].bodegaId}`);

                // Verificar si el usuario es 'admin'
                if (usuario === 'admin') {
                  // Redirigir al perfil de administrador
                  localStorage.setItem("admin", true);
                  window.location.href = "/perfil-admin";
                } else {
                  // Redirigir al perfil de bodega
                  window.location.href = "/perfil-bodega";
                }

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
        <button type="submit" class="btn btn-light">Entrar</button>
        <button type="button" className="btn btn-light" onClick={handleLogout}>
            Salir
        </button>
      </form>
    </div>
  );
};

export default BarraNavegacion;
