import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import OptIn from "./Pages/OptIn";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <h1>Home</h1>} />
        <Route path="/optin" component={OptIn} />
        <Route component={() => <h1>Lost</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
