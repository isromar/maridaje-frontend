import logo from './icono_vino_byn.png';
import './App.css';
import ComponenteSuperior from './components/filtros';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetallesVino from './components/views/vino/view';
import EditarVino from './components/views/vino/edit';
import PerfilBodega from './components/views/bodega/view';
import TopMenu from './components/menu';
import PerfilAdmin from './components/views/admin/list';
import ComidaOptions from './components/views/admin/comida';
import DenominacionOrigenOptions from './components/views/admin/denominacionorigen';
import TipoVinoOptions from './components/views/admin/tipovino';
import VariedadUvaOptions from './components/views/admin/variedaduva';
import BodegaOptions from './components/views/admin/bodega';
import VinosBodega from './components/views/bodega/vino';
import EditarBodega from './components/views/bodega/edit';
import ListaVinosAdmin from './components/views/admin/listavinos';
import NuevoVinoAdmin from './components/views/admin/nuevovino';
import NuevoVino from './components/views/vino/add';

function App() {
  const usuario = localStorage.getItem("usuario");
  const adminRoutes = (
    <>
      <Route path="/perfil-admin" element={<PerfilAdmin nombre="Admin" />} /> 
      <Route path="/perfil-admin/comida" element={<ComidaOptions />} />
      <Route path="/perfil-admin/denominacion-origen" element={<DenominacionOrigenOptions />} /> 
      <Route path="/perfil-admin/tipo-vino" element={<TipoVinoOptions />} /> 
      <Route path="/perfil-admin/variedad-uva" element={<VariedadUvaOptions />} /> 
      <Route path="/perfil-admin/bodega" element={<BodegaOptions />} />
      <Route path="/perfil-admin/lista-vinos" element={<ListaVinosAdmin />} />
      <Route path="/perfil-admin/nuevo-vino" element={<NuevoVinoAdmin />} />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
            <header className="App-header">
              <div>
                <TopMenu/>
              </div>
            </header>
            <body className="App-body">
              <div className="fondo-titulo">
                <h1>Maridaje con vinos de la Comunidad Valenciana </h1>
              </div>
              <br />
              <div>
                <h5>Para ver recomendaciones de maridaje, selecciona una comida o busca un vino</h5>
              </div>
              <br />
              <div>
                <ComponenteSuperior />
              </div>
              <br />
              <img src={logo} className="App-logo" alt="logo" />
            </body>
          </div>
        } />
        <Route path="/view/:vinoId" element={<DetallesVino />} />
        <Route path="/edit/:vinoId" element={<EditarVino />} />

        <Route path="/perfil-bodega/:bodegaId" element={<PerfilBodega nombre="nombre"/>} />
        <Route path="/perfil-bodega/:bodegaId/lista-vinos" element={<VinosBodega />} />
        <Route path="/perfil-bodega/:bodegaId/nuevo-vino" element={<NuevoVino />} />
        <Route path="/perfil-bodega/:bodegaId/editar-bodega" element={<EditarBodega />} />

        {usuario === 'admin' ? adminRoutes : null}

      </Routes>
    </Router>
  );
}

export default App;