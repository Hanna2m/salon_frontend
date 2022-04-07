import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";

const SelectedCustomer = () => {
    let params = useParams();
    let navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
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

    const handleDelete = async() => {
            const element = document.querySelector('#info');
            try {
            await axios.delete(API_URL+`${id}`)
            .then(element.innerHTML = 'Delete successful',
            setShow(false))
            } catch (error) {
            console.log(error)
            }}   
       setTimeout(()=>{
        navigate("/customers")
    }, 10000)    
        

    if(loading) {return "Loading..."} else {console.log(customer)}
    
return (
    <>
    <div id="info">
    <h4>{customer.name}</h4>
    <button onClick={() => setShow(true)}>Delete</button>
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
    </div>
    <Modal 
            onClose={() => setShow(false)} show={show} 
            onSubmit={() => handleDelete()}>
            The information about Customer {customer.name} would be deleted. Are you sure?
        </Modal>
    </>
    
)
}

export default SelectedCustomer;