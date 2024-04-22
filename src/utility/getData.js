import { apiUrl } from "../data/Url";


/* Obtiene los datos según la url que se pasa por parámetro e incluye las opciones en la búsqueda en la bbdd si las hay */
export const getData = async (url, busquedaNombreVino = '', selectedOption = null, bodegaId = null) => {
  if (busquedaNombreVino === '' && selectedOption === '') {
    return;
  }
  let params = new URLSearchParams();

  if (busquedaNombreVino !== '') {
    params.append('nombre', busquedaNombreVino);
  } else if (selectedOption !== null) {
    params.append('comida.nombre', selectedOption.label);
  }

  if (bodegaId !== null) {
    params.append('bodega.id', bodegaId);
  }

  const urlConParametros = `${url}?${params.toString()}`;
  const response = await fetch(urlConParametros); // Envía el parámetro con la url
  const data = await response.json();
  return data;
}

/* Obtiene los datos según la url que se pasa por parámetro e incluye las opciones en la búsqueda en la bbdd si las hay */
export const getDataPerfilBodega = async (url, bodegaId = null) => {
  let params = new URLSearchParams();

  bodegaId = localStorage.getItem("bodegaId");
  if (bodegaId !== null) {
    params.append('bodega.id', bodegaId);
  }

  //A1234567A probar como CIF

  const urlConParametros = `${url}?${params.toString()}`;
  const response = await fetch(urlConParametros); // Envía el parámetro con la url
  const data = await response.json();
  return data;
}

/* Comprueba si el usuario recibido está en la bbdd */
export const comprobarLogin = async (usuario) => {
  let url = apiUrl.bodegas  // Url de la API con los registros de las bodegas
  if (usuario === '') {
    return;
  }
  const params = new URLSearchParams();
  params.append('cif', usuario);  // Añade el paráemtro 'cif' a la url
  const urlConParametros = `${url}?${params.toString()}`;
  
  const response = await fetch(urlConParametros); // Envía el parámetro con la url
  const data = await response.json();
  return data;
}

