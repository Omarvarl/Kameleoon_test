import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from './Layout'
import Result from './Result/Result';
import Dashboard from './Dashboard/Dashboard';


function App() {
  return (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />

      <Route path='/result' element={<Result />}>
        <Route path=':id' element={<></>} />
      </Route>

      <Route path='finalize' element={<Result />}>
        <Route path=':id' element={<></>} />
      </Route>

    </Route>
  </Routes>
  );
}

export default App;
