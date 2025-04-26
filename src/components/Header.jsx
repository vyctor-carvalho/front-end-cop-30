import React from 'react';
import './css/Header.css';
import { Link } from 'react-router-dom';
import imageUnama from '../img/image2.png'

function Header() {
  return (
    <header className="header">
      
      <div className="site-name">
        <Link to="/"><h1><span>run</span>dev</h1></Link>
      </div>

      <div className="logo">
        <img src={imageUnama} alt="Unama logo" />
      </div>

      <nav className="nav">
        <Link to="/registration">CADASTRO</Link>
        <Link to="/login">LOGIN</Link>
        {/* <button className='downloadBtn' onClick={handleDownload}>
          Baixar Documento
        </button> */}
      </nav>
    </header>
  );
}

export default Header;
