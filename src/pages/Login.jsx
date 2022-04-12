import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = "https://groomer-server.herokuapp.com/";
  const { setAuth } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async() => {
    const values = getValues()
    postLogin(values.email, values.password)
  };
  const postLogin = async (email, password) => {
    let {user} ={};
      try {await 
          axios
          .post(API_URL+"login", {email, password})
          .then(res =>  {
            if(res.data.token) {
              // document.cookie = `token=${res.data.token}`
              localStorage.setItem("user", JSON.stringify(res.data))
              localStorage.getItem("user")
              user = JSON.parse(localStorage.getItem("user"));
              console.log('1', user)
              const name = user.name;
              // const id = user.id;
              const token = user.token
              const role = user.role
              console.log('2', name)
              setAuth({ token, role, name });
              // console.log('2', localStorage.getItem("user").role)
              if (user.role === "admin") {
                window.location = "/dashboard";
              } 
              else {
                if (location.state?.from) {
                  navigate(location.state.from);
                }
              }
            }
            return res.data
            })
         } catch (error) {
          console.log(error)
      };
  };

  return (
    <div>
      <h2>Log in</h2>
      <div className="register-form" style={{width: "480px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              name="email" 
              type="text"
              {...register('email')}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
            <div className="invalid-feedback">
              {errors.email?.message}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              />
            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
