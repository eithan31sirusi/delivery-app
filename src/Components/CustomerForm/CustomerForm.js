import React, { useState } from "react";
import './CustomersForm.css'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


const CustomerForm = ({ addCustomer, setCustomerModalMode }) => {

  const [customerName, setCustomerName] = useState();


  const createCustomerHandler = () => {
    if( customerName ) {
      addCustomer(customerName)
      setCustomerName('')
      setCustomerModalMode(false)
    }
  }


  return (
    <div className="package-modal-container">
          <div className="package-modal-outline" onClick={ () => setCustomerModalMode(false) }></div>
          <div className="package-modal-inline">
            <TextField 
            id="outlined-basic" 
            label="Customer Name" 
            variant="standard" 
            onChange={(e) => setCustomerName(e.target.value) }
            type="text"
            name="weight"
            min="1"
            max="10"
          />
            <Button
              variant="contained"
              className="submit"
              onClick={createCustomerHandler}
            >
              Create new Customer
            </Button>
          </div>
    </div>
  );
};

export default CustomerForm;
