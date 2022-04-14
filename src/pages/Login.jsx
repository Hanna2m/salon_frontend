import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { Button } from "@material-ui/core";

import "../components/styles/_login.css";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const API_URL = "https://groomer-server.herokuapp.com/";

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    postLogin(values.email, values.password);
  };
  const postLogin = async (email, password) => {
    let { user } = {};
    try {
      await axios.post(API_URL + "login", { email, password }).then((res) => {
        if (res.data.token) {
          // document.cookie = `token=${res.data.token}`
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.getItem("user");
          user = JSON.parse(localStorage.getItem("user"));
          console.log("1", user);
          const name = user.name;
          // const id = user.id;
          const token = user.token;
          const role = user.role;
          console.log("2", name);
          setAuth({ token, role, name });
          if (user.role === "admin") {
            window.location = "/dashboard";
          }
          else {
          navigate(from, { replace: true });
          }
        }
        return res.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login">
      <Header />
      <div className="content">
        <h2>Log in</h2>
        <div className="register-form" style={{ width: "480px" }}>
          <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <Button variant="outlined" type="submit">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
