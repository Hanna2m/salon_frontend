import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SelectedCustomer = () => {
    let params = useParams();
    const [customer, setCustomer] = useState()
    const [loading, setLoading] = useState(true);
    const id = params.customerId;
    console.log(id)
    const API_URL = "https://groomer-server.herokuapp.com/customer/";

    useEffect(() => {
        setLoading(true)
        getCustomer();
    }, []);

    const getCustomer = async() => {
        console.log(API_URL+`${id}`)
        try {
          await axios.get(API_URL+`${id}`)
          .then((res) => {
            console.log(res.data)
            setCustomer(res.data)
            setLoading(false)
          })
        } catch (error) {
          console.log(error.message);
        }
      }
    
    if(loading) {return "Loading..."} else {console.log(customer)}
    
return (
    <>
    <h4>Customer {customer.name}</h4>
    <button>Book time</button>
    <div className="contact-info">
        <h5>Contact information</h5>
        <p>Phone: {customer.phone}</p>
        <p>Email: {customer.email}</p>
        <button>Edit</button>
    </div>
    <div className="dogs-info">
        <h5>Dog(s)</h5>
        <ul>
            {customer.dogs.map((d) => (
                <li key={d._id}>
                    <p>Name: {d.dogName}</p>
                    <p>Size: {d.size}</p>
                    <p>Hair: {d.hair}</p>
                    <p>Info: {d.info}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </li>))
            }
        </ul>
        <button>Add dog</button>   
    </div>
    </>
)
}

export default SelectedCustomer;