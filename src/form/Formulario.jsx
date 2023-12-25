import React, { useState } from 'react';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    maduracion: '',
    variedad_uva: ''
    // Otros campos del formulario
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getData = () => {
    // Lógica para enviar los datos del formulario al backend
    // Por ejemplo, utilizando fetch para realizar una solicitud GET a la API de API Platform
    fetch(`https://ejemplo.com/api/vinos?nombre=${formData.nombre}&tipo=${formData.tipo}&maduracion=${formData.maduracion}&variedad_uva=${formData.variedad_uva}`)
      .then(response => response.json())
      .then(data => {
        // Manejo de los datos obtenidos
        console.log(data);
      })
      .catch(error => {
        // Manejo de errores
        console.error('Error al obtener los datos', error);
      });
  };

  return (
    <form onSubmit={getData}>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre del Vino"
      />
      <input
        type="text"
        name="tipo"
        value={formData.tipo}
        onChange={handleInputChange}
        placeholder="Tipo de Vino"
      />
      <input
        type="text"
        name="maduracion"
        value={formData.maduracion}
        onChange={handleInputChange}
        placeholder="Maduración"
      />
      <input
        type="text"
        name="variedad_uva"
        value={formData.variedad_uva}
        onChange={handleInputChange}
        placeholder="Variedad de Uva"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Formulario;
