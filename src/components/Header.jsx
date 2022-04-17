import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

import "./styles/_header.css";
import logo from "../assets/logo.png";
import { Button } from "@material-ui/core";

function Header() {
  const location = useLocation();
  const handleLogout = () => {
    AuthService.logout();
    window.location = "/";
  };
  const user = AuthService.getCurrentUser();

  return (
    <header>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
        {user && (
          <div className="menu">
            <div id="links">
              {user.role === "admin" && (
                <Link to="/dashboard" className="navbar-link dashboard-link">
                  Dashboard
                </Link>
              )}
              <div id="auth">
                <h6 className="greeting">Hello, {user.name} </h6>
              </div>
            </div>
            <Button variant="outlined" size="small" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/" className="navbar-link hover-style">
              Home
            </Link>
            <Link
              to="/signup"
              replace
              state={{ from: location }}
              className="navbar-link hover-style"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              replace
              state={{ from: location }}
              className="navbar-link hover-style"
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
