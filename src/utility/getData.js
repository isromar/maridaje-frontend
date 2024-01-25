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
  console.log(urlConParametros)

  const response = await fetch(urlConParametros);
  const data = await response.json();
  return data;
}

