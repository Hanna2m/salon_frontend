import axios from "axios";
import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email, password)
        //reset errors
        emailError.textContent = '';
        passwordError.textContent = '';
        
        try {
            const res = await
            axios({
            method: 'POST',
            url: "http://localhost:3080/login",
            data: JSON.stringify({
              email, password
            }),
            headers: {'Content-Type': 'application/json'}
          });
          console.log(res.data)
            const data = res.data;
            console.log(data.user);
              if (data.errors) {
                emailError.textContent = data.errors.email;
                passwordError.textContent = data.errors.password;
              }
              if (data.user) {
                window.location = '/'
              }
            
          } catch (error) {
            console.log(error)
          }

    }

    return (
        <div>
            <h2>Log in</h2>
            <form>
            <label htmlFor="email">Email</label>
            <input name="email" onChange={(e) => setEmail(e.target.value)}></input>
            <div className="email error"></div>
            <label htmlFor="password">Password</label>
            <input name="password" onChange={(e) => setPassword(e.target.value)}></input>
            <div className="password error"></div>
            <button onClick={handleSubmit}>Log in</button>
            </form>
        </div>
    )
}


export default Login