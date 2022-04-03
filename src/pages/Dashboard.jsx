import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return(
        <>
        <h2>Dashboard</h2>;
        <Link to="/services">Services</Link>
        </>
        
    )
}

export default Dashboard;