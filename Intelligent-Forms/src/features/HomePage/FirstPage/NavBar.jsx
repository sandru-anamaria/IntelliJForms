import React, { useState } from "react";
import "./FirstPage.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="Nav-Bar">
      <div className="Form">
        <Link to="/" className="Home">
          <img className="LogoPoza" src="images/Logo.png" alt="Logo" />
          <p className="textInt">Intelligent Forms</p>
        </Link>
      </div>
      <div className="Login_Register">
        <Link className="Inf2" to="/Login_Register">
          <img src="images/Login.png" alt="Logo" className="ProfileIcon" />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
