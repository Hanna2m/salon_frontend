import { useState, useMemo } from "react";
import { useEffect } from "react";
import UserContent from "../services/userContent.service";
import axios from "axios";
import { Link } from "react-router-dom";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ModalAddCustomer from "../components/modalAddCustomer";


function Customers(){
    const[customer, setCustomer] = useState();
    const[allCustomers, setAllCustomers] = useState();
    const [loading, setLoading] = useState(true);
    const API_URL = "https://groomer-server.herokuapp.com/customer/";
    const [show, setShow] = useState(false)
    

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

    const handleAddNew = () => {
        
    }
    
    if (loading) {return "Loading..."} else {console.log(allCustomers)}

    return (
        <>
        <h2>Customers</h2>
        <button onClick={() => setShow(true)}>Add customer</button>
        <MaUTable>

            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Dog(s)</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            {allCustomers &&
            allCustomers.map((c) => (
            <TableBody>
                <TableRow>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>{c.dogs.map((d) => (
                        <p>{d.dogName}</p>
                    ))}</TableCell>

                </TableRow>
            </TableBody>))}
        </MaUTable>
        <ModalAddCustomer onClose={() => setShow(false)} show={show}/>
        </>
    )
}

export default Customers;