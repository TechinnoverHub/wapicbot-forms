import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import logo from "../assets/logo.jpeg";
import { useParams } from "react-router-dom";
// import includesAll from "../utils/includesAll";
import formatNum from "../utils/formatNum";
const vehicleType = [
  "moov-third-party",
  "moov-plus-(fire-and-theft)",
  "moov-luxury-(extented-comprehensive)",
  "moov-prestige-(private-comprehensive)",
  "moov-prestige-(commercial-comprehensive)",
];
const lifeTypes = [
  "e-term",
  "smart-scholars-plan",
  "smart-life",
  "smart-senior-plan",
];
const productmap = {
  "moov-third-party": "Motor Insurance (3rd Party)",
  "moov-plus-(fire-and-theft)": "Motor Insurance (Third Party Fire & Theft)",
  "moov-luxury-(extented-comprehensive)":
    "Motor Insurance Luxury (Comprehensive)",
  "moov-prestige-(private-comprehensive)":
    "Comprehensive Vehicle Insurance (Private Motor)",
  "moov-prestige-(commercial-comprehensive)":
    "Comprehensive Vehicle Insurance (Commercial Motor)",
  "house-holders-insurance": "House Holders Insurance",
  "house-owners-insurance": "House Owners Insurance",
  "e-term": "E-Term",
  "smart-scholars-plan": "Smart Scholars Plan",
  "smart-life": "Smart Life",
  "smart-senior-plan": "Smart Senior Plan",
};
const QuoteSuccess = (props) => {
  const [quoteDetails, setQuoteDetails] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    // const states = Object.keys(props.location.state || {});
    console.log(props.location.state);
    if (props.location.state) {
      if (vehicleType.includes(props.location.state.productType)) {
        const {
          vehicleClass,
          manufacturer,
          model,
          policyholder,
          vehicleValue,
          productType,
          quote,
          regNumber,
          floodExt,
          riot,
          tracking,
        } = props.location.state;

        return setQuoteDetails({
          vehicleClass: vehicleClass,
          manufacturer: manufacturer,
          model: model,
          policyholder: policyholder,
          vehicleValue: vehicleValue,
          product: productmap[productType],
          productType: productType,
          quote: quote,
          regNumber,
          floodExt: floodExt,
          riot: riot,
          tracking: tracking,
        });
      }

      const { productType, quote } = props.location.state;
      setQuoteDetails({
        product: productmap[productType],
        productType: productType,
        quote: quote,
      });
      // const isValid = includesAll(states, [
      //   "vehicleClass",
      //   "manufacturer",
      //   "model",
      //   "policyholder",
      //   "vehicleValue",
      //   "productType",
      //   "quote",
      // ]);

      // console.log(isValid, props, states);
      // if (!isValid) {
      //   return props.history.replace("/product/moov-third-party");
      // }
    }
  }, [props]);
  return (
    <Container>
      <div className="mobileCenter">
        <img src={logo} alt="logo" />
        <h1 className="titleHead">Quote Summary</h1>

        <div>
          <div className="group1">
            <h3>Choice Premium (Payable Premium)</h3>
            <h1>₦{formatNum(Math.ceil(quoteDetails.quote))}</h1>
          </div>

          <div className="group2">
            <h4>Product</h4>
            <h3>{quoteDetails.product}</h3>
          </div>
          {vehicleType.includes(quoteDetails.productType) && (
            <>
              <h2 className="sect1">Vehicle Information</h2>

              <div className="group2">
                <h4>Vehicle Class</h4>
                <h2>{quoteDetails.vehicleClass}</h2>
              </div>
              <div className="group2">
                <h4>Vehicle make</h4>
                <h2>{quoteDetails.manufacturer}</h2>
              </div>
              <div className="group2">
                <h4>Vehicle model</h4>
                <h2>{quoteDetails.model}</h2>
              </div>
              <div className="group2">
                <h4>Vehicle value</h4>
                <h2>₦{formatNum(quoteDetails.vehicleValue)}</h2>
              </div>
              {quoteDetails.floodExt && (
                <div className="group2">
                  <h4>Flood Extension</h4>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {quoteDetails.floodExt}
                  </h2>
                </div>
              )}
              {quoteDetails.riot && (
                <div className="group2">
                  <h4>Riot strike and civil commotion cover</h4>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {quoteDetails.riot}
                  </h2>
                </div>
              )}
              {quoteDetails.tracking && (
                <div className="group2">
                  <h4>Vehicle Tracker</h4>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {quoteDetails.tracking}
                  </h2>
                </div>
              )}
            </>
          )}
        </div>
        <button
          className="continueButton"
          onClick={() => {
            if (
              vehicleType.includes(quoteDetails.productType) ||
              lifeTypes.includes(quoteDetails.productType)
            ) {
              return props.history.push(`/extra/${userId}`, quoteDetails);
            }

            return props.history.push(`/kyc/${userId}`, quoteDetails);
          }}
        >
          Continue
        </button>
      </div>
    </Container>
  );
};

export default QuoteSuccess;
