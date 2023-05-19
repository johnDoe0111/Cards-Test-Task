import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page/HomePage';
import CardInfo from './pages/card-info-page/CardInfo';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/Cards-API' element= { <HomePage/> }/>
          <Route path='/card-info/:id' element={ <CardInfo/> }/>
        </Routes>
    </div>
  );
}

export default App;
