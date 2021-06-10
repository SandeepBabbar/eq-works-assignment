import './App.css';
import {Stats, Events, POI} from './modules'

function App() {
  return (
    <div className="App">
      <h1>Dashboard</h1>
      <br/>
      <br/>
      <Stats/>
      <Events/>
      <POI/>
    </div>
  );
}

export default App;
