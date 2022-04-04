import React from "react";
import { Link, Outlet, useLocation } from 'react-router-dom';
import AuthService from "../services/auth.service";


function Header(){
    const location = useLocation();
    const handleLogout = () => {
        AuthService.logout();
        window.location = '/';
    }
    const user = AuthService.getCurrentUser();
    
    
    return(
        <>
        <h3>Happy Dogs</h3>
        <nav>
        {user && 
        <div>
            <p>Hello, {user.userName} </p>
            <button onClick={handleLogout}>Log out</button>
        </div>}
        {!user &&
        <div>
            <Link to="/signup">Sign up</Link>
            <Link to="/login" replace state={{from: location}}>Log in</Link>
        </div>}
       
        
      </nav>
    <Outlet />
        </>
    )
}

export default Header;