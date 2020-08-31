import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import logo from "../assets/logo.jpeg";
import includesAll from "../utils/includesAll";
import formatNum from "../utils/formatNum";

const productmap = {
  "moov-third-party": "Moov Third Party",
  "moov-plus-(fire-and-theft)": "Moov Plus (Fire & Theft)",
  "moov-luxury-(extented-comprehensive)":
    "Moov Luxury (Extented Comprehensive)",
  "moov-prestige-(private-comprehensive)":
    "Moov Prestige (Private Comprehensive)",
};
const QuoteSuccess = (props) => {
  const [quoteDetails, setQuoteDetails] = useState({});
  useEffect(() => {
    const states = Object.keys(props.location.state || {});
    const isValid = includesAll(states, [
      "vehicleClass",
      "manufacturer",
      "model",
      "policyholder",
      "vehicleValue",
      "productType",
    ]);

    console.log(isValid, props, states);
    if (!isValid) {
      return props.history.replace("/product/moov-third-party");
    }
    const {
      vehicleClass,
      manufacturer,
      model,
      policyholder,
      vehicleValue,
      productType,
    } = props.location.state;

    setQuoteDetails({
      vehicleClass,
      manufacturer,
      model,
      policyholder,
      vehicleValue,
      product: productmap[productType],
    });
  }, [props]);
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "30px 0",
        }}
      >
        <img src={logo} alt="logo" />
        <h1 className="titleHead">Quote Summary</h1>

        <div>
          <div className="group1">
            <h3>Choice Premium (Payable Premium)</h3>
            <h1>₦{formatNum(quoteDetails.vehicleValue * 0.05)}</h1>
          </div>

          <div className="group2">
            <h4>Product</h4>
            <h3>{quoteDetails.product}</h3>
          </div>

          <h2 className="sect1">Vehicle Information</h2>

          <div className="group2">
            <h4>Vehicle Class</h4>
            <h2>{quoteDetails.vehicleClass}</h2>
          </div>
          <div className="group2">
            <h4>Vehicle Type</h4>
            <h2>{quoteDetails.policyholder}</h2>
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
        </div>
        <button
          className="continueButton"
          onClick={() => props.history.push("/kyc")}
        >
          Continue
        </button>
      </div>
    </Container>
  );
};

export default QuoteSuccess;
