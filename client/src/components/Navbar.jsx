import { useState } from 'react';
import logo from '../assets/logo1.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="logo">
          <img src={logo} alt="Logo jayB" className="logo-img" />
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="menu-dropdown">
          <ul>
            <li>Se connecter</li>
            <li>Messagerie</li>
            <li>Settings</li>
          </ul>
        </div>
      )}
    </nav>
  );
}