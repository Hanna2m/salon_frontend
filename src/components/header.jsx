import React from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import AuthService from "../services/auth.service";


function Header(){
    const location = useLocation();
    const handleLogout = () => {
        AuthService.logout();
        window.location = '/';
    }
    return(
        <>
        <h3>Happy Dogs</h3>
        <nav>
        
        <Link to="/signup">Sign up</Link>
        <Link to="/login" replace state={{from: location}}>Log in</Link>
        <button onClick={handleLogout}>Log out</button>
      </nav>
    <Outlet />
        </>
    )
}

export default Header;