import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import OptIn from "./Pages/OptIn";
import Insurances from "./Pages/Insurances";
import logo from "./assets/logo.jpeg";
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
                <Link to="/optin">Optin</Link>
                <Link to="/product/moovthirdparty">Car Insurance beta</Link>
              </div>
            </div>
          )}
        />
        <Route path="/optin" component={OptIn} />
        <Route path="/product/:type" component={Insurances} />
        <Route component={() => <h1>Lost</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
