import React, { useEffect, useState } from "react";
import UserContent from "../services/userContent.service";
import "./Modal.css";

const ModalAddCustomer = props => {
    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[phone, setPhone] = useState();
    const[dogName, setDogName] = useState();
    const[size, setSize] = useState();
    const[hair, setHair] = useState();

    const closeOnEscDown = (e) => {
        if ((e.charCode || e.keyCode) === 27){
            props.onClose()
        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscDown);
        return function cleanup() {
            document.body.addEventListener('keydown', closeOnEscDown); 
        }
    }, [])

    const handleSubmit = () => {
        UserContent.addNewCustomer(name, email, phone, dogName, size, hair);
        props.onClose()
    }

    if(!props.show) {
        return null
    }
    
  return (
    <div className="modal" onClick={props.onClose}> 
        <div className="modal-content" onClick={e => e.stopPropagation()}> 
            <div className="modal-header">
                <h4 className="modal-title">Add new Customer</h4>
            </div>
            <div className="modal-body">
                <form>
                <label htmlFor="name">Name</label>
                <input name="name" onChange={(e) => setName(e.target.value)}></input>
                <label htmlFor="email" >Email</label>
                <input name="email" onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="phone" >Phone</label>
                <input name="phone" onChange={(e) => setPhone(e.target.value)}></input>
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
            </div>
            <div className="modal-footer">
                <button className="button" onClick={props.onClose}>Cancel</button>
                <button className="button" onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ModalAddCustomer;