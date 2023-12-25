import logo from './logo.svg';

import './App.css';
import ComidaSelect from './components/select/ComidaSelect';

function App() {

    return (
    <div className="App">
      <header className="App-header">
        <ComidaSelect/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
