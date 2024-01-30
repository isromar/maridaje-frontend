import { lazy } from 'react';

const AppRoutes = [
  {
    path: '/details/:id',
    component: lazy(() => import('../../views/details/edit')),
    meta: {
      navLink: '/details/view'
    }
  },
  // Agrega más rutas aquí si es necesario
];

export default AppRoutes;