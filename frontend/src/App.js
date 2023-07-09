import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Registration from './components/pages/Registration';
import Events from './components/pages/Events';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/registration/:id' element={<Registration />} />
        <Route exact path='/events' element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
