import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CustomerForm from "../Components/CustomerForm/CustomerForm";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Customers = () => {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [customerModalMode, setCustomerModalMode] = useState(false)

  let history = useHistory();

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  // adding a new customer Handler

  const addCustomersHandler = (customerName) => {
    // destructure the customer object
    let newCustomersData = [...appData.customers];
    // create a new customer object
    newCustomersData = [
        // return the new array
        ...newCustomersData,
      {
        // generate a new id for the new customer by one after the highest id number
        id: Math.max(...newCustomersData.map((customer) => customer.id)) + 1,
        // set the name of the new customer to the value of the input
        name: customerName,
      }
    ];

    // update the state by returning prevState snapshot & newCustomersData
    setAppData((prev) => {
      return {
        ...prev,
        customers: newCustomersData,
      };
    });
  };

  // delete a customer Handler

  const deleteCustomersHandler = (customerId) => {
    let newData = { ...appData };
    newData.customers = newData.customers.filter(
      (customer) => customer.id !== customerId
    );
    setAppData(newData);
  };


  // redirect to the invoice page with the customer id in the params
  const createInvoiceHandler = (customerId) => {
    history.push(`/invoice/:${customerId}`);
  };

  // conditional rendering of the customers table
  if (appData.customers.length <= 0) return <p>No Customers Data!</p>;

  return (
    <>
    <h1>Customers Page</h1>
      <Box sx={{ flexGrow: 1 }}></Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>
              <Button 
                variant="contained" 
                color="success"
                onClick={() => setCustomerModalMode( true )}
                >add customer</Button>
                {
                  customerModalMode 
                  && 
                  <CustomerForm 
                    addCustomer={addCustomersHandler}
                    setCustomerModalMode={setCustomerModalMode}
                    />
                }
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData &&
              appData.customers.map((row) => {
                return (
                  <TableRow
                  key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => createInvoiceHandler(row.id)}
                      >
                        Create Invoice
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => deleteCustomersHandler(row.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Customers;
