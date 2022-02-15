import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  let history = useHistory();

  return (
    <AppBar position="static" open={open}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "unset" }}>
            Mail Delivery Service
          </Link>
        </Typography>
      </Toolbar>

      <Drawer anchor={"left"} open={open} onClose={closeDrawer}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, ...(open && { display: "block" }) }}
          onClick={closeDrawer}
          style={{ borderRadius: "0" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <List style={{ width: "300px" }}>
          <Link to="/customers" onClick={closeDrawer}>
            <ListItem button>
              <ListItemText primary={"Customers"} />
            </ListItem>
          </Link>
          <Link to="/packages" onClick={closeDrawer}>
            <ListItem
              button
              onClick={() => {
                history.push("/packages");
              }}
            >
              <ListItemText primary={"Packages"} />
            </ListItem>
          </Link>
          <Link to="/invoice" onClick={closeDrawer}>
            <ListItem
              button
              onClick={() => {
                history.push("/invoice");
              }}
            >
              <ListItemText primary={"Invoices"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
