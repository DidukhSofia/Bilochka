import React from "react";
import { Link } from "react-router-dom";
import './navbar-module.css';


function Navbar() {
  return (
    <div className="nav-container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Оренда друзів
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Головна
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/allfriends" className="nav-link">
                  Наші друзі
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/about" class="nav-link">
                  Про нас
                </Link>
              </li>
            </ul>
            <Link to="/signin" className="nav-btn">Увійти</Link>
            <Link to="/signup" className="nav-btn">Зареєструватись</Link>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
