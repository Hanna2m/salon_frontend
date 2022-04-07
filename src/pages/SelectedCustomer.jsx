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
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [dogName, setDogName] = useState();
    const [size, setSize] = useState();
    const [hair, setHair] = useState();
    const id = params.customerId;
    console.log(id)
    const API_URL = "http://localhost:3080/customer/";

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
            setShowDelete(false))
            } catch (error) {
            console.log(error)
            }
            setTimeout(()=>{
                navigate("/customers")
            }, 10000)    
        }   
       
    
    const handleAddDog = async(dogName, size, hair) => {
        const dog = [{dogName, size, hair}]
        const dogs = customer.dogs.push({dogName, size, hair});
        console.log(customer.dogs)
        console.log({dogs})
        console.log(customer)
        try {
          await fetch({
            method: "PUT",
            url: API_URL+`${id}`,
            data: JSON.stringify({dogs}),
            headers: {'Content-Type': 'application/json'}
          })
          .then((res) => {
              console.log("POST", res.data)
              setShowAdd(false)
              navigate(`/${id}`)
            })
        } catch (error) {
          console.log(error)
        }
      }

    if(loading) {return "Loading..."} else {console.log(customer)}
    
return (
    <>
    <div id="info">
    <h4>{customer.name}</h4>
    <button onClick={() => setShowDelete(true)}>Delete</button>
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
        <button onClick={() => setShowAdd(true)}>Add dog</button>   
    </div>
    </div>
    <Modal titel="Delete information"
            onClose={() => setShowDelete(false)} show={showDelete} 
            onSubmit={() => handleDelete()}>
            The information about Customer {customer.name} would be deleted. Are you sure?
    </Modal>
    <Modal titel="Add Dog"
            onClose={() => setShowAdd(false)} show={showAdd} 
            onSubmit={() => handleAddDog(dogName, size, hair)}>
            <form>
                <label htmlFor="dogName" >Dog's name</label>
                <input name="dogName" onChange={(e) => setDogName(e.target.value)}></input>
                <label htmlFor="size" >Dog's size</label>
                <input name="size" list="size" onChange={(e) => setSize(e.target.value)}></input>
                    <datalist id="size">
                        <option value="small (up to 10 kg)" />
                        <option value="medium (11-20 kg)" />
                        <option value="large (more than 20 kg)" />
                    </datalist>
                <p>Dog's hair</p>
                <label htmlFor="short" >short</label>
                <input type="radio" name="hair" id="short" value="short" onChange={(e) => setHair(e.target.value)} />
                <label htmlFor="long" >long</label>
                <input type="radio" name="hair" id="long" value="long" onChange={(e) => setHair(e.target.value)}/>   
            </form>
           
    </Modal>
    </>
    
)
}

export default SelectedCustomer;