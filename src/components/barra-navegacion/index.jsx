import React, { useState, useEffect } from "react";
import { comprobarLogin } from "../../utility/getData";
import { mostrarMensaje } from "../../utility/utils";
import Swal from "sweetalert2";
import setBasePath from "../../utility/redirectUtils";

const BarraNavegacion = () => {
  //const history = useHistory();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("bodegaId");
    localStorage.removeItem("acceso");
    localStorage.removeItem("admin");
    setBasePath("/");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await comprobarLogin(usuario); // Llama a la función que comprueba si existe ese usuario en la bbdd 

    if (usuario === "" && (password !== "" || password === '')) {
    } else {
      if (data && data["hydra:member"].length > 0) {
        const options = data["hydra:member"].map((bodega) => ({
          value: bodega.id,
          label: bodega.cif,
          name: bodega.nombre,  // Obtener el nombre de la bodega
          bodegaId: bodega.id,
          password: bodega.password
        }));

        if (options[0].label === usuario && password === options[0].password) { // Check if the password matches
          mostrarMensaje("Acceso correcto", `Te damos la bienvenida ${options[0].name}`, "success");
          localStorage.setItem("usuario", usuario);
          setAcceso(true);

          localStorage.setItem("bodegaId", options[0].bodegaId);
          localStorage.setItem("acceso", true);

          // Verificar si el usuario es 'admin'
          if (usuario === 'admin') {
            // Redirigir al perfil de administrador
            localStorage.setItem("admin", true);
            setBasePath("/perfil-admin");
          } else {
            // Redirigir al perfil de bodega
            const path = `/perfil-bodega/${options[0].bodegaId}`;
            setBasePath(path);
          }

          setTimeout(() => {
            // Cerrar el mensaje después de 3 segundos
            Swal.close();
          }, 4000);
        } else {
          mostrarMensaje(
            "Error de acceso",
            "La bodega no está registrada o la contraseña es incorrecta",
            "error"
          );
          setAcceso(false)
          setTimeout(() => {
            // Cerrar el mensaje después de 3 segundos
            Swal.close();
          }, 4000);
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
    <div className="barra-navegacion d-flex">

      <form onSubmit={handleFormSubmit} className="d-flex align-items-center">
        {!acceso && (
          <>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder={"Usuario"}
                value={usuario}
                onChange={handleUsuarioChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-light">Entrar</button>
          </>
        )}
        {acceso && (
          <button type="submit" className="btn btn-light" onClick={handleLogout}>
            Salir
          </button>
        )}
      </form>

    </div>
  );
};

export default BarraNavegacion;
