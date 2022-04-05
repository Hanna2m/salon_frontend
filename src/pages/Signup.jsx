import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

function Signup() {
  // const form = document.querySelector('form');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");
  const url = "http://localhost:3080/signup";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);
  };
  return (
    <div>
      <Header />
      <h2>Sign up</h2>
      <form>
        <label htmlFor="name">Name</label>
        <input name="name" onChange={(e) => setName(e.target.value)}></input>
        <label htmlFor="email">Email</label>
        <input name="email" onChange={(e) => setEmail(e.target.value)}></input>
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="password error"></div>
        <label htmlFor="role">Role</label>
        <input
          name="role"
          list="roles"
          onChange={(e) => setRole(e.target.value)}
        ></input>
        <datalist id="roles">
          <option value="Customer" />
          <option value="Admin" />
        </datalist>
        <button onClick={handleSubmit}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
