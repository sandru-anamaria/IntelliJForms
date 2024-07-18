import React from "react";
import "../HomePage/FirstPage/FirstPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar2() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  function LogOut() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <div className="Nav-Bar">
      <div className="Form">
        <Link to="/" className="Home">
          <img className="LogoPoza" src="images/Logo.png" alt="Logo" />
          <p className="textInt">Intelligent Forms</p>
        </Link>
      </div>
      <Link to="/Create_Form" className="Home">
        New Form
      </Link>
      <Link to="/Update_Form" className="Contact-Us">
        Forms
      </Link>
      <div className="Login_Register">
        <img
          style={{ cursor: "pointer" }}
          src="images/Login.png"
          alt="Logo"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="dropdown-menu" style={{ cursor: "pointer" }}>
            <div className="Inf3" onClick={LogOut}>
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar2;
