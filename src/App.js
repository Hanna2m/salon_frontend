import React, {useState} from 'react';
import "./App.css";
import Home from "./pages/Home";
import { Link, Outlet } from "react-router-dom";
import Services from "./pages/Services";
import Login from "./pages/Login";


function App() {
  return (
    <div className="App">
      <Home />
  
    </div>
  );
}

export default App;
