import Swal from 'sweetalert2';
import { apiUrl } from '../data/Url';
import { getDataPerfilBodega } from './getData';

export const mostrarMensaje = (titulo, texto, icono, tiempo = 3000) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    timer: tiempo,
  });
};

export const mostrarMensajeConfirmacion = (titulo, texto, icono) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  });
};

export const obtenerNombreBodega = async (bodegaId) => {
  try {
    const url = apiUrl.bodegas; // URL base de las bodegas
    const data = await getDataPerfilBodega(`${url}/${bodegaId}`); // Agregar el ID de la bodega a la URL
    return data.nombre; // Devolver el nombre de la bodega
  } catch (error) {
    console.error(error);
    return 'Nombre de bodega no encontrado';
  }
};
