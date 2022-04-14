import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminCalendar from "../components/AdminCalendar";
import AuthContext from "../context/AuthProvider";

import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="content">
        <h2>Dashboard</h2>;<Link to="/services">Services</Link>;
        <Link to="/customers">Customers</Link>
        <AdminCalendar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
