export const getData = async (url, busquedaNombreVino = '', selectedOption = '') => {
  const params = new URLSearchParams();

  if (busquedaNombreVino !== '') {
    params.append('nombre', busquedaNombreVino);
  } else {
    params.append('comida', selectedOption.label);
  }

  const urlConParametros = `${url}?${params.toString()}`;
  console.log(urlConParametros)

  const response = await fetch(urlConParametros);
  const data = await response.json();
  return data;
}