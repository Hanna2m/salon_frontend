import React from "react";
import { Link, Outlet } from 'react-router-dom';

function Header(){
    return(
        <>
        <h3>Happy Dogs</h3>
        <nav>
        <Link to="/signup">Sign up</Link>
        <Link to="/login">Log in</Link>
      </nav>
    <Outlet />
        </>
    )
}

export default Header;