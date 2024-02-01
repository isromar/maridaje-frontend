import logo from './icono_vino_byn.png';
import './App.css';
import ComponenteSuperior from './components/filtros';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DetallesVino from './components/views/vino/view';
import EditarVino from './components/views/vino/edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <div className="App">
            <header className="App-header">
              <div>
                <h1>Maridaje con vinos de la Comunidad Valenciana</h1>
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
            </header>
          </div>
        } />
        <Route path="/view/:vinoId" element={<DetallesVino />} />
        <Route path="/edit/:vinoId" element={<EditarVino />} />
      </Routes>
    </Router>
  );
}

export default App;