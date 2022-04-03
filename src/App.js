import React, {useState} from 'react';
import "./App.css";
import Home from "./pages/Home";
import { Link, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Services from "./pages/ServicesConfig";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
