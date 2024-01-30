import logo from './logo.svg';
import './App.css';
import ComponenteSuperior from './components/filtros';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetallesVino from './components/views/vino/details';

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
        <Route path="/details/:id" element={<DetallesVino />} />
      </Routes>
    </Router>
  );
}

export default App;