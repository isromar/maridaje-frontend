import Swal from 'sweetalert2';

export const mostrarMensaje = (titulo, texto, icono) => {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono
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