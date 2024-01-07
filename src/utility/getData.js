/*
export const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
*/
export const getData = async (url, params = {}) => {
  // Construir la URL con los parámetros de filtro
  const urlWithParams = new URL(url);
  const {tipo = ""} = params
  //Object.keys(params).forEach(key => urlWithParams.searchParams.append(key, params[key]));
  // Recorre las claves de 'params' y agrega cada par clave-valor a 'urlWithParams'.
  // Si el valor es 'undefined', se agrega la clave con un valor vacío para que traiga todos los datos de la bbdd para esa key
    Object.keys(params).forEach(key => {
      if (params[key] === undefined) {
        urlWithParams.searchParams.append(key, '');
      } else {
        urlWithParams.searchParams.append(key, params[key]);
      }
    });


  // Realizar la solicitud a la URL con los parámetros de filtro
  const response = await fetch(urlWithParams);
  const data = await response.json();
  return data;
}