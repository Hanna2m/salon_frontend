import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ServicesConfig from "./pages/ServicesConfig";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import SelectedCustomer from "./pages/SelectedCustomer";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
        {/* public routes */}
      <Route path="signup" element={<Signup />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="booking/:serviceId" element={<Booking />}></Route>
      {/* proteccted routes */}
      <Route path="services" element={<ServicesConfig />}></Route>
      <Route path="dashboard" element={<Dashboard />}></Route>
      <Route path="customers" element={<Customers />}></Route>
      <Route path=":customerId" element={<SelectedCustomer />}></Route>
    </Routes>
  );
}

export default App;
