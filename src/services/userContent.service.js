import axios from "axios";
import { useState } from "react";

const API_URL = "https://groomer-server.herokuapp.com/";



const getCustomer = async(id) => {
  try {
    await axios.get(API_URL+"customer/"+`{id}`)
    .then((res) => {
      return(res.data)
    })
  } catch (error) {
    console.log(error.message);
  }
}

const addNewCustomer = async(name, email, phone) => {
  try {
    await axios
    .post(API_URL+"customer", 
    { name, email, phone}
    )
    .then((res) => console.log("POST", res.data))
  } catch (error) {
    console.log(error)
  }
}


const UserContent = {
   
    getCustomer,
    addNewCustomer
}

export default UserContent;