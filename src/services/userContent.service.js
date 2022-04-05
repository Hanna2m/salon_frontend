import axios from "axios";
import { useState } from "react";

const API_URL = "https://groomer-server.herokuapp.com/customer/";



const getCustomer = async(id) => {
  try {
    await axios.get(API_URL+`{id}`)
    .then((res) => {
      return(res.data)
    })
  } catch (error) {
    console.log(error.message);
  }
}

const addNewCustomer = async(name, email, phone) => {
  try {
    await axios({
      method: "POST",
      url: API_URL,
      data: JSON.stringify({ name, email, phone}),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => console.log("POST", res.data))
  } catch (error) {
    console.log(error)
  }
}

const addNewCustomersDog = async(dogName, size, hair) => {
  try {
    await axios({
      method: "POST",
      url: API_URL,
      data: JSON.stringify({ dogName, size, hair }),
      headers: {'Content-Type': 'application/json'}
    })
    .then((res) => console.log("POST", res.data))
  } catch (error) {
    console.log(error)
  }
}

const UserContent = {
    getCustomer,
    addNewCustomer,
    addNewCustomersDog
}

export default UserContent;