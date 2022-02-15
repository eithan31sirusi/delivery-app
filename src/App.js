import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Customers from "./pages/Customers";
import Invoice from "./pages/Invoice";
import Packages from "./pages/Packages";

import Home from "./pages/Home";

import Navbar from "./Components/Navbar/Drawer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/packages" component={Packages} />
          <Route path="/invoice" component={Invoice} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
