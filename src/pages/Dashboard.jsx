import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <h2>Dashboard</h2>;<Link to="/services">Services</Link>
    </>
  );
};

export default Dashboard;
