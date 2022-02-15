import React, { useState, useEffect } from "react";

import PackageModal from "../Components/PackagesList/PackageModal/PackageModal";

// mui components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Packages = () => {
  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [packageModalMode, setPackageModalMode] = useState(false)
  

  useEffect(() => {
    fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      setAppData(data);
    });
  },[])


  const addPackage = (value) => {
    let newPackage = [...appData.packages];

    newPackage = [
      ...newPackage,
      {
        id: `pack${Math.max(...appData.packages.map( pack => pack.id.split('k')[1])) + 1}`,
        weight: `${value.packageWeight}kg`,
        customerid: Number(value.customer.id),
        price: Number(value.packagePrice),
        shippingOrder: Math.max(...appData.packages.map( pack  => pack.shippingOrder)) + 1,
      }
    ];

    setAppData((prev) => ({ ...prev, packages: newPackage }));
  };

  const deletePackageHandler = (packId) => {
    let newData = { ...appData };
    newData.packages = newData.packages.filter((pack) => pack.id !== packId);
    setAppData(newData);
  };

  const sortHandler = (btnType, packId) => {
    let newData = [ ...appData.packages ]; // deep copy
    let packIndex = newData.findIndex( pack => pack.id === packId); // pack index number.
    let getPackFromObject = newData[packIndex]; // get the object pack.
    newData.splice(packIndex, 1); // remove him from the array

    if( btnType === 'UP' ) newData.splice(packIndex - 1 , 0, getPackFromObject);
    if( btnType === 'DOWN' ) newData.splice(packIndex + 1 , 0, getPackFromObject);

    setAppData((prev) => ({ ...prev, packages: newData }));
  }

  if( appData.packages.length <= 0) return <p>No Packages data!</p>

  return (
    <div>
      <h1>Packages Page</h1>
      {
        packageModalMode && <PackageModal  
        addPackage={addPackage}
        setPackageModalMode={setPackageModalMode}
        customersList={appData.customers}
        />
      }
      


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              
              <TableCell>id</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Price</TableCell>
              

              <TableCell>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setPackageModalMode( !packageModalMode )}
                >
                   <AddIcon /> 
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData.packages.map((row) => {
              return (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={row.id}
                >
                  
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{appData.customers.find(customer => customer.id === Number(row.customerid)).name}</TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => deletePackageHandler(row.id)}>Delete</Button>
                  </TableCell>
                  <TableCell >
                    <Button variant="outlined" size="small" onClick={() => sortHandler('UP', row.id)}>< ArrowDropUpIcon/></Button>
                    <Button variant="outlined" size="small" onClick={() => sortHandler('DOWN', row.id)}>< ArrowDropDownIcon/></Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Packages;
