import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Mainn';
import Login from './pages/login';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Registration from './pages/Registration';
import Residue from './pages/residue';
import Dashboard from './pages/dasboard';
import Footer from './components/Footer';




function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residue" element={<Residue />} />
          <Route path="/" element={<Main />} />

        </Routes>
        <Footer />
      
      </div>
    </BrowserRouter>
  );
}

export default App;
