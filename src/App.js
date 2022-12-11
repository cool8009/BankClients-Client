import AddClient from './AddClient';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css';
import ViewClients from './ViewClients';
import Navbar from './Navbar';


function App() {
  return (
    <Router className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<AddClient />}/>
        <Route path='/ViewClients' element={<ViewClients />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
