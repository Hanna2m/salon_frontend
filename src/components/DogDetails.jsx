// import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import AuthService from "../services/auth.service"
import { useEffect } from "react";
import jwt_decode from 'jwt-decode';

const fetchCustomers = async () => {
  try {
    const {data} = await axios.get('https://groomer-server.herokuapp.com/customer')
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function DogDetails() {
  const [size, setSize] = useState("");
  const [hair, setHair] = useState("");
  const [dogName, setDogName] = useState("");
  let customer = {};

  //check if user is logged in
  useEffect(async ()=>{
    const user = await AuthService.getCurrentUser();
    console.log(user)
    // const token = user.token;
    // console.log('1', token)
    // const decoded = jwt_decode(token);
    // console.log('2', decoded)
    if(user) {
      const userEmail = user.email
      console.log('1', userEmail)
      customer = await findCustomerByEmail(userEmail);
      console.log('4', customer)
      setDogName(customer[0].dogs[0].dogName);
      setSize(customer[0].dogs[0].size)
      setHair(customer[0].dogs[0].hair)
    }
  }, [])
  
  const findCustomerByEmail = async(email) => {
    const fetchedCustomers = await fetchCustomers();
    console.log('2', fetchedCustomers);
    const foundCustomer = fetchedCustomers.filter(item => item.email.includes(email))
    console.log('3', foundCustomer)
    return foundCustomer
  }

  const handleConfirm = (e) => {
    e.preventDefault();

    console.log("... dog details ....");

    // direct to a booking overview page which includes login signup options
    // reset all state ??
  };

  return (
    <form onSubmit={handleConfirm}>
      <h4>Please provide details about your dog</h4>
      <label htmlFor="dogName">Dog's name</label>
      <input
        value = {dogName}
        name="dogName"
        onChange={(e) => setDogName(e.target.value)}
      ></input>
      <label htmlFor="size">Dog's size</label>
      <input
        value={size}
        name="size"
        list="size"
        onChange={(e) => setSize(e.target.value)}
      ></input>
      <datalist id="size">
        <option value="small (up to 10 kg)" />
        <option value="medium (11-20 kg)" />
        <option value="large (more than 20 kg)" />
      </datalist>
      <p>Dog's hair</p>
      <label htmlFor="short">short</label>
      <input
        type="radio"
        name="hair"
        id="short"
        value="short"
        onChange={(e) => setHair(e.target.value)}
      />
      <label htmlFor="long">long</label>
      <input
        type="radio"
        name="hair"
        id="long"
        value="long"
        onChange={(e) => setHair(e.target.value)}
      />
      <Button btnTxt="confirm" btnType="submit" />
    </form>
  );
}

export default DogDetails;
