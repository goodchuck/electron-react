import logo from './logo.svg';
import './App.css';
import * as DM from './JS/doroseeModule/doroseeModule.js';
import animate from  './JS/object.js';
import init from './JS/renderer.js';


function App() {
  init();
  animate();
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>{DM.test}</h1>
      </header> */}
    </div>
  );
}

export default App;
