import { apiUrl } from "../data/Url";

export const getData = async (url, busquedaNombreVino = '', selectedOption = null) => {
  if (busquedaNombreVino === '' && selectedOption === '') {
    return;
  }
  let params = new URLSearchParams();

  if (busquedaNombreVino !== '') {
    params.append('nombre', busquedaNombreVino);
  } else if (selectedOption !== null) {
    params.append('comida.nombre', selectedOption.label);
  }

  const urlConParametros = `${url}?${params.toString()}`;
  const response = await fetch(urlConParametros);
  const data = await response.json();
  return data;
}

export const comprobarLogin = async (usuario) => {
  let url = apiUrl.bodegas  // Url de la API con los registros de las bodegas
  if (usuario === '') {
    return;
  }
  const params = new URLSearchParams();
  params.append('cif', usuario);
  const urlConParametros = `${url}?${params.toString()}`; // Envía el parámetro usuario
  const response = await fetch(urlConParametros);
  const data = await response.json();
  return data;
}