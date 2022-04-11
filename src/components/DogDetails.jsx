// import { Button } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import AuthService from "../services/auth.service"
import { useEffect } from "react";

const fetchUsers = async () => {
  try {
    const {data} = await axios.get('https://groomer-server.herokuapp.com/user')
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

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
  let {user} = {};

  //check if user is logged in
  useEffect(async ()=>{
    user = await AuthService.getCurrentUser();
    const token = user.token;
    console.log('1', token)
    
  }, [])
  
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
        name="dogName"
        onChange={(e) => setDogName(e.target.value)}
      ></input>
      <label htmlFor="size">Dog's size</label>
      <input
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
