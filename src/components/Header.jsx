import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import imageUnama from '../img/image2.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">

        <div className="site-name">
          <Link to="/">
            <h1><span>run</span>dev</h1>
          </Link>
        </div>

        <div className="logo">
          <img src={imageUnama} alt="Unama logo" />
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/registration" onClick={() => setMenuOpen(false)}>Cadastro</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <a href="/docs/doc.pdf" download="doc.pdf" onClick={() => setMenuOpen(false)}>Sobre</a>
        </nav>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>

      </div>
    </header>
  );
}

export default Header;
