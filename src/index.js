import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ServicesConfig from "./pages/ServicesConfig";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import SelectedCustomer from "./pages/SelectedCustomer";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="services" element={<ServicesConfig />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="customers" element={<Customers />}></Route>
      <Route path=":customerId" element={<SelectedCustomer />}></Route>
      <Route path="booking" element={<Booking />}></Route>
      {/* <Route path="booking/:id" element={<Booking />}></Route> */}
    </Routes>
  </BrowserRouter>,
  rootElement
);
