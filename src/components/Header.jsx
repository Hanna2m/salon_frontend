import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

import "./styles/_header.css";

function Header() {
  const location = useLocation();
  const handleLogout = () => {
    AuthService.logout();
    window.location = "/";
  };
  const user = AuthService.getCurrentUser();

  return (
    <header>
      <h3>Happy Dogs</h3>
      <nav className="navbar">
        {user && (
          <div>
            <p>Hello, {user.name} </p>
            <div>
              <Link to="/" className="navbar-link">
                Home
              </Link>
              {user.role === "Admin" && (
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/" className="navbar-link">
              Home
            </Link>
            <Link
              to="/signup"
              replace
              state={{ from: location }}
              className="navbar-link"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              replace
              state={{ from: location }}
              className="navbar-link"
            >
              Log in
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
    </header>
  );
}

export default Header;
