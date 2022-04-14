import { useState, useEffect } from "react";
import axios from "axios";
import TableCustomers from "../components/Table";
import Modal from "../components/Modal";
import Header from "../components/Header";
import { Button } from "@material-ui/core";
import icon from "../assets/icon_customer.svg"

function Customers() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [allCustomers, setAllCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [dogName, setDogName] = useState();
  const [size, setSize] = useState();
  const [hair, setHair] = useState();
  const API_URL = "https://groomer-server.herokuapp.com/customer/";

  useEffect(() => {
    setLoading(true);
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      await axios.get(API_URL).then((res) => {
        setAllCustomers(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    addNewCustomer(name, email, phone, dogName, size, hair);
    setShow(false);
  };

  const addNewCustomer = async (name, email, phone, dogName, size, hair) => {
    const dogs = [{ dogName, size, hair }];
    try {
      await axios({
        method: "POST",
        url: API_URL,
        data: JSON.stringify({ name, email, phone, dogs }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => console.log("POST", res.data));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return "Loading...";
  } else {
    console.log(allCustomers);
  }

  const search = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(query));
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="section-title">
        <img src={icon} alt="customer-icon" />
          <h2>Customers</h2>
        </div>
        <div className="search">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="btn-float-right">
        <Button variant="text" onClick={() => setShow(true)}>
          Add customer
        </Button>
        </div>
  

       
        <TableCustomers data={search(allCustomers)} />
        <Modal
          title="Add customer"
          onClose={() => setShow(false)}
          show={show}
          onSubmit={handleSubmit}
        >
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                className="form-control"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label htmlFor="dogName">Dog's name</label>
              <input
                className="form-control"
                name="dogName"
                onChange={(e) => setDogName(e.target.value)}
              />
            </div>
            <div className="form-group">
            <label htmlFor="size">Dog's size</label>
              <input
              className="form-control"
                name="size"
                list="size"
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <datalist id="size">
              <option value="small (up to 10 kg)" />
              <option value="medium (11-20 kg)" />
              <option value="large (more than 20 kg)" />
            </datalist>
            <div className="form-group" >
              <p>Dog's hair</p>
              <label className="radiolable" htmlFor="short">short</label>
              <input
                className="radiobtn"
                type="radio"
                name="hair"
                id="short"
                value="short"
                onChange={(e) => setHair(e.target.value)}
              />
              <label className="radiolable" htmlFor="long">long</label>
              <input
                className="radiobtn"
                type="radio"
                name="hair"
                id="long"
                value="long"
                onChange={(e) => setHair(e.target.value)}
              />
            </div>
            
          </form>
        </Modal>
      </div>
    </>
  );
}

export default Customers;
