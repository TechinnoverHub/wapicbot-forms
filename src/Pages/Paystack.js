import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import logo from "../assets/logo.jpeg";
import loader from "../assets/loader.gif";
import includesAll from "../utils/includesAll";
import formatNum from "../utils/formatNum";
const publicKey = "pk_test_2e6143d930f7d438e1b3f79302de0c836779f87d";
const Paystack = (props) => {
  const [quoteDetails, setQuoteDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const { userId } = useParams();
  useEffect(() => {
    const states = Object.keys(props.location.state || {});
    const isValid = includesAll(states, [
      "product",
      "quote",
      "productType",
    ]);

    console.log(isValid, props, states);
    if (!isValid) {
      return props.history.replace("/");
    }
    const {
      // vehicleClass,
      // manufacturer,
      // model,
      // policyholder,
      // vehicleValue,
      product,
      quote,
      productType,
    } = props.location.state;

    setQuoteDetails({
      // vehicleClass,
      // manufacturer,
      // model,
      // policyholder,
      // vehicleValue,
      product,
      quote,
      productType,
    });
  }, [props]);
  const componentProps = {
    email: "test@gmail.com",
    amount: Math.ceil(quoteDetails.quote) * 100,
    metadata: {
      name: "wapic",
      phone: '08111228899',
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (data) => {
      setLoading(true)
      console.log(data);
      axios.post('https://wapicbot-api.herokuapp.com/api/products/buy-policy', {
        txRef:  data.trxref,
        user:userId,
        productCode: quoteDetails.productType
      }).then(({data}) => {
         alert("Thanks for doing business with us! Come back soon!!");
         setLoading(false)
         setPaid(true)
          // window.location = "https://wa.me/+2348111228899";
      }).catch(err => {
        console.log(err);
        setLoading(false)
      })
      // alert("Thanks for doing business with us! Come back soon!!");
      // window.location = "https://wa.me/+2348111228899";
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  return (
    <Container>
      <div className="mobileCenter">
        <img src={logo} alt="logo" />
        <div className="group1">
          <h3>Choice Premium (Payable Premium)</h3>
          <h1>₦{formatNum(Math.ceil(quoteDetails.quote))}</h1>
        </div>
        {loading ? (
        <div style={{marginTop: '10px'}}>
          <img src={loader} alt="loader" />
        </div>
      ):
      paid ?   
      <div className="group2">
            <h3>Payment successfull</h3>
            <button className="paystack-button" onClick={() => {
              window.location = "https://wa.me/+2348111228899";
            
            }}>Continue to chat</button>
          </div>
          :
        <PaystackButton className="paystack-button" {...componentProps} />
}
      </div>
    </Container>
  );
};

export default Paystack;
