import logo from './logo.svg';
import './App.css';
import * as DM from './JS/doroseeModule/doroseeModule.js';
import init from './JS/renderer.js';
import { Route, Routes, Link } from 'react-router-dom';

import Test1 from './Pages/test1';
import Test2 from './Pages/test2';

function App() {
  init();  
  // animate();
  return (
  <>
    <div className="App">
      <Link to="/test1">te1</Link>
      <Link to="/test2">te2</Link>
    </div>
    <Routes>
    {/* <Route path="/" element={<Splash />} />
    <Route path="/layout" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/deviceInfo" element={<Home />} />
    <Route path="web/*" element={<Home />}>
      <Route path=":id" element={<WebPost />} />
    </Route>
    <Route path="/ajax" element={<Home />}/> */}
    <Route path="/test1" element={<Test1 />}/>
    <Route path="/test2" element={<Test2 />}/>
    </Routes>
  </>
  );
}

export default App;
