import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ServicesConfig from "./pages/ServicesConfig";
import Signup from "./pages/Signup";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="services-config" element={<ServicesConfig />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
