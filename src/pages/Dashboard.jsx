import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AdminCalendar from "../components/AdminCalendar";
import AuthContext from "../context/AuthProvider";
import Header from "../components/Header";
import "../components/styles/_dashboard.css";
import icon from "../assets/icon_dashbord.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <section className="dashboard">
      <Header />
      <div className="content dashboard-content">
        <div className="section-title">
          <img src={icon} alt="customer-icon" />
          <h2>Dashboard</h2>
        </div>

        <div className="dashboard-card-container">
          <div>
            <Link className="dashboard-card" to="/services">
              Services
            </Link>
          </div>
          <div>
            <Link className="dashboard-card" to="/customers">
              Customers
            </Link>
          </div>
        </div>
        <div className="admin-cal">
          <h3 style={{ marginBottom: "2rem" }}>Appointments for today:</h3>
          <AdminCalendar />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

export default Dashboard;
