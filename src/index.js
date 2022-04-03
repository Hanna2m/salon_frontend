import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Signup from "./pages/Signup";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="signup" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="services" element={<Services />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
    </Route>
  </Routes>
  </BrowserRouter>,
  rootElement
)
