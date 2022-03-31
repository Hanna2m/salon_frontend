import axios from "axios";
import React, { useState } from "react";
import Home from "./Home";



function Signup() {
  // const form = document.querySelector('form');
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');
  const url = 'http://localhost:3080/signup';
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);
    //reset errors
    emailError.textContent = '';
    passwordError.textContent = '';

try {
  const res = await
  axios({
  method: 'post',
  url: "http://localhost:3080/signup",
  data: {
    name, email, password, role
  },
  // headers: {'Content-Type': 'application/json'}
});
  const data = await res.json();
  console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      <Home />
    }
  
} catch (error) {
  console.log(error)
}
}
   return (
    <div>
        <h2>Sign up</h2>
        <form>
        <label htmlFor="name">Name</label>
        <input name="name" onChange={(e) => setName(e.target.value)}></input>
        <label htmlFor="email">Email</label>
        <input name="email" onChange={(e) => setEmail(e.target.value)}></input>
        <div className="email error"></div>
        <label htmlFor="password">Password</label>
        <input name="password" onChange={(e) => setPassword(e.target.value)}></input>
        <div className="password error"></div>
        <label htmlFor="role">Role</label>
        <input name="role" list="roles" onChange={(e) => setRole(e.target.value)}></input>
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