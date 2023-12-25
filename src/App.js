import logo from './logo.svg';
import ComidaSelect from './components/select/ComidaSelect'

import './App.css';
import BuscadorVinos from './components/buscador/BuscadorVinos';
function App() {

    return (
    <div className="App">
      <header className="App-header">
      <div>
        <h1>Maridaje con vinos de la Comunidad Valenciana</h1>
      </div>
        <div className='row'>
          <div class="col">
            <ComidaSelect/>
          </div>
          <div class="col">
            <BuscadorVinos/>
          </div>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
