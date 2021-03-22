import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import OptIn from "./Pages/OptIn";
import Insurances from "./Pages/Insurances";
import logo from "./assets/logo.png";
import KYC from "./Pages/kyc";
import QuoteSuccess from "./Pages/QuoteSuccess";
import Paystack from "./Pages/Paystack";
import VehicleCheck from "./Pages/VehicleCheck";
import ExtraDataPage from "./Pages/extraDataPage";
import Claims from "./Pages/Claims";
import { PolicyIDProvider } from "./context/policyPurchased";
import { QuoteProvider } from "./context/quoteData";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <QuoteProvider>
        <PolicyIDProvider>
          <Route
            exact
            path="/"
            component={() => (
              <div className="main">
                <img style={{width: "80%", marginBottom: '2rem', marginTop: '1rem'}} src={logo} alt="logo" />
                <h1>Select a form to view</h1>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Link to="/optin?whatsapp=+2349069787848">Optin</Link>
                  <Link to="/product/moov-third-party/5f6200d513833f0017840b4f">
                    Motor Insurance (3rd Party)
                  </Link>
                  <Link to="/product/moov-plus-(fire-and-theft)/5f6200d513833f0017840b4f">
                    Motor Insurance (Third Party Fire & Theft)
                  </Link>
                  <Link to="/product/moov-luxury-(extented-comprehensive)/5f6200d513833f0017840b4f">
                    Motor Insurance Luxury (Comprehensive)
                  </Link>
                  <Link to="/product/moov-prestige-(private-comprehensive)/5f6200d513833f0017840b4f">
                    Comprehensive Vehicle Insurance (Private Motor)
                  </Link>
                  <Link to="/product/commercial-vehicle-(comprehensive)/5f6200d513833f0017840b4f">
                    Comprehensive Vehicle Insurance (Commercial Motor)
                  </Link>
                  <Link to="/product/smart-scholars-plan/5f6200d513833f0017840b4f">
                    Smart Scholars Plan
                  </Link>
                  <Link to="/product/smart-life/5f6200d513833f0017840b4f">
                    Smart Life
                  </Link>
                  <Link to="/product/smart-life-plus/5f6200d513833f0017840b4f">
                    Smart Life plus
                  </Link>
                  <Link to="/product/smart-senior-plan/5f6200d513833f0017840b4f">
                    Smart Senior Plan
                  </Link>
                  <Link to="/product/e-term/5f6200d513833f0017840b4f">
                    E-term Life Insurance
                  </Link>
                  <Link to="/product/house-owners-insurance/5f6200d513833f0017840b4f">
                    House Insurance
                  </Link>
                  <Link to="/quote-success">SuccessQuote</Link>
                  <Link to="/kyc/5f6200d513833f0017840b4f">KYC form</Link>
                  <Link to="/extra/5f6200d513833f0017840b4f">Extra form</Link>
                  <Link to="/check-vehicle/moov-third-party/5f6200d513833f0017840b4f">
                    Vehicle Check
                  </Link>
                  <Link to="/claims">FNOL</Link>
                </div>
              </div>
            )}
          />
          <Route path="/optin" component={OptIn} />
          <Route path="/claims" component={Claims} />
          <Route path="/optin/:referee" component={OptIn} />
          <Route
            path="/check-vehicle/:type/:userId"
            component={VehicleCheck}
          />{" "}
          <Route path="/product/:type/:userId" component={Insurances} />
          <Route path="/kyc/:userId" component={KYC} />
          <Route path="/extra/:userId" component={ExtraDataPage} />
          <Route path="/quote-success/:userId" component={QuoteSuccess} />
          <Route path="/pay/:userId" component={Paystack} />
          {/* <Route component={() => <h1>Lost</h1>} /> */}
        </PolicyIDProvider>
        </QuoteProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
