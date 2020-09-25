import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import OptIn from './Pages/OptIn';
import Insurances from './Pages/Insurances';
import logo from './assets/logo.jpeg';
import KYC from './Pages/kyc';
import QuoteSuccess from './Pages/QuoteSuccess';
import Paystack from './Pages/Paystack';
import VehicleCheck from './Pages/VehicleCheck';
import ExtraDataPage from './Pages/extraDataPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          component={() => (
            <div className='main'>
              <img src={logo} alt='logo' />
              <h1>Select a form to view</h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Link to='/optin?whatsapp=+2349069787848'>Optin</Link>
                <Link to='/product/moov-third-party/5f6200d513833f0017840b4f'>
                  Car Insurance beta
                </Link>
                <Link to='/product/moov-plus-(fire-and-theft)/5f6200d513833f0017840b4f'>
                  Moov Plus (Fire & Theft)
                </Link>
                <Link to='/product/moov-luxury-(extented-comprehensive)/5f6200d513833f0017840b4f'>
                  Moov Luxury
                </Link>
                <Link to='/product/moov-prestige-(private-comprehensive)/5f6200d513833f0017840b4f'>
                  Moov Prestige (Private Comprehensive)
                </Link>
                <Link to='/product/moov-prestige-(commercial-comprehensive)/5f6200d513833f0017840b4f'>
                  Moov Prestige (Commercial Comprehensive)
                </Link>
                <Link to='/product/e-term/5f6200d513833f0017840b4f'>
                  All Life Insurance
                </Link>
                <Link to='/product/house-owners-insurance/5f6200d513833f0017840b4f'>
                  House Insurance
                </Link>
                <Link to='/quote-success'>SuccessQuote</Link>
                <Link to='/kyc/5f6200d513833f0017840b4f'>KYC form</Link>
                <Link to='/extra/5f6200d513833f0017840b4f'>Extra form</Link>
                <Link to='/check-vehicle'>Vehicle Check</Link>
              </div>
            </div>
          )}
        />
        <Route path='/optin' component={OptIn} />
        <Route path='/check-vehicle' component={VehicleCheck} />
        <Route path='/product/:type/:userId' component={Insurances} />
        <Route path='/kyc/:userId' component={KYC} />
        <Route path='/extra/:userId' component={ExtraDataPage} />
        <Route path='/quote-success/:userId' component={QuoteSuccess} />
        <Route path='/pay/:userId' component={Paystack} />
        <Route component={() => <h1>Lost</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
