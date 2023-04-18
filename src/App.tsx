import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home-page/HomePage';
import CardInfo from './pages/card-info-page/CardInfo';
import { ICarousel } from './components/carousel/Carousel';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element= { <HomePage/> }/>
          <Route path='/card-info/:id' element={ <CardInfo/> }/>
        </Routes>
    </div>
  );
}

export default App;
