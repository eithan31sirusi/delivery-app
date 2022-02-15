import React, { useState } from "react";
import "./package-modal.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const PackageModal = ({ addPackage, customersList, setPackageModalMode }) => {
  const [packageWeight, setPackageWeight] = useState(""); // package weight
  const [packagePrice, setPackagePrice] = useState(""); // package price
  const [customer, setCustomer] = useState({
    name: "Choose Customer",
    id: null,
  }); // customer {id + name}

  const handleChangeCustomer = (e) => {
    if (e.target.value !== "DEFAULT") {
      let id = e.target.value;
      let name = customersList.find(
        (customer) => customer.id === Number(id)
      ).name;
      setCustomer({ id, name });
    }
  };

  const createPackageHandler = () => {
    if (packageWeight && packagePrice && customer.name && customer.id) {
      addPackage({ packageWeight, packagePrice, customer });
      setPackageWeight("");
      setPackagePrice("");
      setCustomer({ name: "Choose Customer", id: null });
      setPackageModalMode(false);
    }
  };

  return (
    <div className="package-modal-container">
      <div
        className="package-modal-outline"
        onClick={() => setPackageModalMode(false)}
      ></div>
      <div className="package-modal-inline">
        <TextField
          id="outlined-basic"
          label="Package Weight"
          variant="standard"
          onChange={(e) => setPackageWeight(e.target.value)}
          value={packageWeight}
          type="number"
          name="weight"
          placeholder="Package Weight"
          min="1"
          max="10"
        />
        <TextField
          id="outlined-basic"
          label="Package Price"
          variant="standard"
          onChange={(e) => setPackagePrice(e.target.value)}
          value={packagePrice}
          type="number"
          name="price"
          placeholder="Package Price"
          min="1"
        />

        <TextField
          id="standard-select-currency-native"
          select
          label=""
          SelectProps={{
            native: true,
          }}
          variant="standard"
          name="customer"
          onChange={(e) => {
            handleChangeCustomer(e);
          }}
          value={customer.name}
        >
          <option className="option" value="DEFAULT">
            {customer.name}
          </option>
          {customersList &&
            customersList.map((customer) => (
              <option
                className="customer-option"
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
        </TextField>
        <Button
          variant="contained"
          className="submit"
          onClick={createPackageHandler}
        >
          Create new Package
        </Button>
      </div>
    </div>
  );
};

export default PackageModal;
