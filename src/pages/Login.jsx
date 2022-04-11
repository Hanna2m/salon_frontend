import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AuthService from "../services/auth.service";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  let user = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    AuthService.login(email, password);

    
    setTimeout(() => {
      console.log(AuthService.getCurrentUser());
      user = AuthService.getCurrentUser();
      if (user.role === "admin") {
        window.location = "/dashboard";
      } else {
        if (location.state?.from) {
          navigate(location.state.from);
        }
      }
    }, 3000);
  };

  return (
    <div>
      <Header />
      <h2>Log in</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input name="email" onChange={(e) => setEmail(e.target.value)}></input>
        <div className="email error"></div>
        <label htmlFor="password" type="password">
          Password
        </label>
        <input
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="password error"></div>
        <button onClick={handleSubmit}>Log in</button>
      </form>
    </div>
  );
}

export default Login;
