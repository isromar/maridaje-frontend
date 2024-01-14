import logo from './logo.svg';
import ComidaSelect from './components/select/ComidaSelect'
import BuscadorVinos from './components/buscador/BuscadorVinos';
import './App.css';
import TablaVinos from './components/tabla/TablaVinos';
import TablaCheck from './components/tabla/TablaCheck';
import ComponenteSuperior from './components/filtros';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Maridaje con vinos de la Comunidad Valenciana</h1>
        </div>
        <br/>
        <div>
          <h5>Para ver recomendaciones de maridaje, selecciona una comida o busca un vino</h5>
        </div>
        <div className='row'>
        <ComponenteSuperior/>
          {/*}
          <div className="col col-6 col-sm-6">
            <TablaCheck/>
          </div>

    */}

        </div>
        <br/>
        <div className='row'>
          <TablaVinos />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
