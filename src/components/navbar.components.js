import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
        <Link to="/">ExecerTracker</Link>
      <div className={`navbar-toggle ${isMenuOpen ? "open" : ""}`} onClick={handleMenuToggle}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-list ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/">Exercises</Link></li>
        <li><Link to="/create">Create Exercise Log</Link></li>
        <li><Link to="/user">Create User</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;