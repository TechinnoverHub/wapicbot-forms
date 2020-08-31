import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import OptIn from "./Pages/OptIn";
import Insurances from "./Pages/Insurances";
import logo from "./assets/logo.jpeg";
import KYC from "./Pages/kyc";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <div className="main">
              <img src={logo} alt="logo" />
              <h1>Select a form to view</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Link to="/optin?whatsapp=+2349069787848">Optin</Link>
                <Link to="/product/moov-third-party">Car Insurance beta</Link>
                <Link to="/product/moov-plus-(fire-and-theft)">
                  Moov Plus (Fire & Theft)
                </Link>
                <Link to="/product/moov-luxury-(extented-comprehensive) ">
                  Moov Luxury
                </Link>
                <Link to="/product/moov-prestige-(private-comprehensive)">
                  Moov Prestige (Private Comprehensive)
                </Link>
                <Link to="/product/lifeinsurance">All Life Insurance</Link>
                <Link to="/kyc">KYC form</Link>
              </div>
            </div>
          )}
        />
        <Route path="/optin" component={OptIn} />
        <Route path="/product/:type" component={Insurances} />
        <Route path="/kyc" component={KYC} />
        <Route component={() => <h1>Lost</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
