import { useNavigate } from "react-router-dom";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "./Button";


function TableCustomers( { data }){
    let navigate = useNavigate();

    const handleRowClick = (item) => {
        const user = item._id;
        console.log(`row clicked ${user}`);
        console.log(typeof(user));
        navigate(`/${user}`)
    }

    return (
        <>
        <MaUTable>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Dog(s)</TableCell>
                </TableRow>
            </TableHead>
            {data &&
            data.map((c) => (
            <TableBody>
                <TableRow  key={c._id} onClick={()=>handleRowClick(c)}>
                <TableCell>{c.name}</TableCell>
                    <TableCell >{c.email}</TableCell>
                    <TableCell >{c.phone}</TableCell>
                    <TableCell >{c.dogs.map((d) => (
                        <p key={d._id}>{d.dogName}</p>
                    ))}</TableCell>
                </TableRow>
               
            </TableBody>))}
        </MaUTable>
        </>
    )
}

export default TableCustomers;