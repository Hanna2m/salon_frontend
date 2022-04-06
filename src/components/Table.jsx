import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


function TableCustomers( { data }){
    return (
        <>
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
            {data &&
            data.map((c) => (
            <TableBody>
                <TableRow  key={c._id}>
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