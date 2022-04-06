import { useState, useEffect} from "react";
import axios from "axios";
import ModalAddCustomer from "../components/modalAddCustomer";
import TableCustomers from "../components/Table";


function Customers(){
    const [query, setQuery] = useState('');
    const [show, setShow] = useState(false)
    const[customer, setCustomer] = useState();
    const[allCustomers, setAllCustomers] = useState();
    const [loading, setLoading] = useState(true);
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
        <ModalAddCustomer onClose={() => setShow(false)} show={show}/>
        </>
    )
}

export default Customers;