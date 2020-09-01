import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import { PaystackButton } from "react-paystack";
import logo from "../assets/logo.jpeg";
import includesAll from "../utils/includesAll";
import formatNum from "../utils/formatNum";
const publicKey = "pk_test_2e6143d930f7d438e1b3f79302de0c836779f87d";

const Paystack = (props) => {
  const [quoteDetails, setQuoteDetails] = useState({});
  useEffect(() => {
    const states = Object.keys(props.location.state || {});
    const isValid = includesAll(states, [
      "vehicleClass",
      "manufacturer",
      "model",
      "policyholder",
      "vehicleValue",
      "product",
      "quote",
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
      product,
      quote,
    } = props.location.state;

    setQuoteDetails({
      vehicleClass,
      manufacturer,
      model,
      policyholder,
      vehicleValue,
      product,
      quote,
    });
  }, [props]);
  const componentProps = {
    email: "test@gmail.com",
    amount: quoteDetails.quote * 100,
    metadata: {
      name: "name",
      phone: "0902121212121",
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Thanks for doing business with us! Come back soon!!");
      window.location = "https://wa.me/+2348111228899";
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  return (
    <Container>
      <div className="mobileCenter">
        <img src={logo} alt="logo" />
        <div className="group1">
          <h3>Choice Premium (Payable Premium)</h3>
          <h1>₦{formatNum(quoteDetails.quote)}</h1>
        </div>
        <PaystackButton className="paystack-button" {...componentProps} />
      </div>
    </Container>
  );
};

export default Paystack;
