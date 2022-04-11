import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { useState } from "react";

if (typeof window !== "undefined") {
  injectStyle();
}

const fetchUsers = async () => {
  try {
    const {data} = await axios.get('https://groomer-server.herokuapp.com/user')
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function Signup() {
  const API_URL = "https://groomer-server.herokuapp.com/";
  const location = useLocation();
  const navigate = useNavigate();
  const [chosenRole, setChosenRole]=useState();
  // const API_URL = "http://Localhost:3080/";
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
    formState: { errors },
    getValues
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async() => {
    const values = getValues()
    signup(values.name, values.email, values.password, values.role, values.dog, values.size, values.hair)
    console.log('6', values.dog, values.size, values.hair)
  };

  const signup = async (name, email, password, role, dog, size, hair) => {
    const ifUserUnique = await isUnique(email);
    console.log('3', ifUserUnique);
    if (ifUserUnique){
      console.log('4', name, email, password, role)
      try {await 
        axios.post(API_URL+"signup", {
            name, email, password, role
          })
        .then (res => {
          console.log('5', res.data.token)
          localStorage.setItem("user", JSON.stringify(res.data))
        })
        } catch (error) {
          console.log(error)
        }
      if (role === "admin") {
        window.location = "/dashboard"
      } else {
        //create customer profile:
        addNewCustomer(name, email, dog, size, hair);
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          window.location = "/"
        }
      }

    } else {
      console.log( "Email is already registered");
      toast.dark("Email is already registered!");
      reset();}
  }

  const isUnique = async(email) => {
    const users = await fetchUsers();
    console.log('1', users)
    if(users) {
        const result = users.find(element => element.email === email)
        if (result) {return false}
      }
      return true;
    }

  const addNewCustomer = async(name, email, dog, size, hair) => {
    const dogs = [{dog, size, hair}];
    const phone = '';
    console.log('7', { dog, size, hair})
    console.log(API_URL+'customer')
      try {
        await axios.post('https://groomer-server.herokuapp.com/customer', { name, email, dogs})
        .then((res) => console.log("POST", res.data))
      } catch (error) {
        console.log(error)
      }
    }

    const changeRoleValue = (e) => { 
      setChosenRole(e.target.value);
    }
   
  return (
    <div>
      <Header />
      <h2>Sign up</h2>
      <div className="register-form" style={{width: "480px"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input name="name"
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
              type="text"
              {...register("role")}
              onChange={(e) => changeRoleValue(e)}
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
        
        <div> {/* for Customer role adding dogs info */}
          {chosenRole === 'Customer' &&
          <>
          <div className="form-group">
            <label htmlFor="dog">Dogs Name</label>
            <input name="dog"
              type="text"
              {...register('dog')}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="size">Dogs Size</label>
            <input name="size"
              list="size"
              type="text"
              {...register('size')}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
            <datalist id="size">
              <option value="small (up to 10 kg)" />
              <option value="medium (11-20 kg)" />
              <option value="large (more than 20 kg)" />
            </datalist>
          </div>
          <div className="form-group">
            <p>Dog's hair</p>
            <div>
              <label htmlFor="short">Short</label>
              <input
                type="radio"
                name="hair"
                id="short"
                value="short"
                {...register('hair')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
            </div>
            <div>
              <label htmlFor="long">Long</label>
              <input
                type="radio"
                name="hair"
                id="long"
                value="long"
                {...register('hair')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
            </div>
          </div>
        </>}

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
      <ToastContainer position="top-center"/>
    </div>
  );
}

export default Signup;
