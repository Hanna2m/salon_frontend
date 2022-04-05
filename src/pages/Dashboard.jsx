import React from "react";
import { Link, Outlet } from "react-router-dom";


import Header from "../components/Header";

const Dashboard = () => {
    return(
        <>
      <Header />
        <h2>Dashboard</h2>;
        <Link to="/services">Services</Link>;
        <Link to="/customers">Customers</Link>
        <Outlet />
        </>
        
    )
}

export default Dashboard;
