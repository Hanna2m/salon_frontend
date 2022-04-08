import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import Header from "../components/Header";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();
  const API_URL = "https://groomer-server.herokuapp.com/signup";

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    role: Yup.string()
      .required('Role is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, role);

  };
  return (
    <div>
      <Header />
      <h2>Sign up</h2>
      <div className="register-form" style={{width: "480px"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name"
            onChange={(e) => setName(e.target.value)} 
            type="text"
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
        <div className="invalid-feedback">
          {errors.name?.message}
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input name="email" 
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                />
          <div className="invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            name="role"
            list="roles"
            onChange={(e) => setRole(e.target.value)}
            type="text"
              {...register('role')}
              className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                />
              <div className="invalid-feedback">
              {errors.confirmPassword?.message}
              </div>
          <datalist id="roles">
            <option value="Customer" />
            <option value="Admin" />
          </datalist>
        </div>
        <div className="form-group form-check">
          <input
            name="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            className={`form-check-input ${
              errors.acceptTerms ? 'is-invalid' : ''
            }`}
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
        </div>
        <div className="form-group">
          <button type="submit">Sign up</button>
          <button
              type="button"
              onClick={reset}
              className="btn btn-warning float-right"
            >
              Reset
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
