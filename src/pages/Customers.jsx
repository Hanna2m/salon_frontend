import { useState, useEffect} from "react";
import axios from "axios";
import TableCustomers from "../components/Table";
import Modal from "../components/Modal";


function Customers(){
    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false)
    const[allCustomers, setAllCustomers] = useState();
    const [loading, setLoading] = useState(true);
    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[phone, setPhone] = useState();
    const[dogName, setDogName] = useState();
    const[size, setSize] = useState();
    const[hair, setHair] = useState();
    const API_URL = "https://groomer-server.herokuapp.com/customer/";


    useEffect(() => {
        setLoading(true)
        getAllCustomers();
    }, []);

    const getAllCustomers = async () => {
        try {
          await axios.get(API_URL)
          .then((res) => {
            setAllCustomers(res.data);
            setLoading(false)
          });
        } catch (error) {
          console.log(error.message);
        }
    };

    const handleSubmit = () => {
        addNewCustomer(name, email, phone, dogName, size, hair);
        setShow(false)
    }

    const addNewCustomer = async(name, email, phone, dogName, size, hair) => {
        const dogs = [{dogName, size, hair}]
        try {
          await axios({
            method: "POST",
            url: API_URL,
            data: JSON.stringify({ name, email, phone, dogs}),
            headers: {'Content-Type': 'application/json'}
          })
          .then((res) => console.log("POST", res.data))
        } catch (error) {
          console.log(error)
        }
      }

    if (loading) {return "Loading..."} else {console.log(allCustomers)}

    const search = (data) => {
        return data.filter(item => item.name.toLowerCase().includes(query))
    }

    return (
        <>
        <h2>Customers</h2>
        <button onClick={() => setShow(true)}>Add customer</button>
        <input type="text" placeholder="Search..." className="search" onChange={e => setQuery(e.target.value)}/>
        <TableCustomers data={search(allCustomers)}/>
        <Modal onClose={() => setShow(false)} show={show} onSubmit={handleSubmit}>
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
        </Modal>
        </>
    )
}

export default Customers;