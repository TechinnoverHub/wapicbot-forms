import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import logo from "../assets/logo.jpeg";
import loader from "../assets/loader.gif";
import includesAll from "../utils/includesAll";
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
const publicKey = process.env.REACT_APP_PAYSTACK;
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
      "email",
      "firstname",
      "whatsappNo",
      ...(vehicleType.includes(props.location.state.productType)
        ? [
            "manufacturer",
            "model",
            "engineNumber",
            "vinnumber",
            "regNumber",
            "color",
            "yearOfModel",
          ]
        : []),
      ...(lifeTypes.includes(props.location.state.productType)
        ? ["beneficiaries"]
        : []),
    ]);

    console.log(isValid, props, states);
    if (!isValid) {
      // window.location = 'https://wa.me/+2348111228899';
      return;
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
      email,
      firstname,
      manufacturer,
      model,
      engineNumber,
      vinnumber,
      regNumber,
      color,
      yearOfModel,
      beneficiaries,
      whatsappNo,
      floodExt,
      riot,
      tracking,
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
      email,
      firstname,
      whatsappNo,
      ...(vehicleType.includes(props.location.state.productType)
        ? {
            manufacturer,
            model,
            engineNumber,
            vinnumber,
            regNumber,
            color,
            yearOfModel,
            floodExt,
            riot,
            tracking,
          }
        : {}),
      ...(lifeTypes.includes(props.location.state.productType)
        ? {
            beneficiary: beneficiaries,
          }
        : {}),
    });
  }, [props]);
  const componentProps = {
    email: quoteDetails.email,
    amount: Math.ceil(quoteDetails.quote) * 100,
    metadata: {
      name: quoteDetails.firstname,
      phone: quoteDetails.whatsappNo,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: (data) => {
      setLoading(true);
      console.log(data);
      axios
        .post("https://wapicbot-api.herokuapp.com/api/products/buy-policy", {
          txRef: data.trxref,
          user: userId,
          productCode: quoteDetails.productType,
          policyInfo: {
            productCode: quoteDetails.productType,
            startDate: quoteDetails.coverStartDate,
            premiumLC: quoteDetails.quote,
          },
          ...(vehicleType.includes(props.location.state.productType)
            ? {
                vehicleInfo: {
                  name: quoteDetails.manufacturer,
                  make: quoteDetails.manufacturer,
                  model: quoteDetails.model,
                  engineNumber: quoteDetails.engineNumber,
                  vinNumber: quoteDetails.vinnumber,
                  licenseNumber: quoteDetails.regNumber,
                  color: quoteDetails.color,
                  year: quoteDetails.yearOfModel,
                },
              }
            : {}),
          ...(lifeTypes.includes(props.location.state.productType)
            ? {
                beneficiary: quoteDetails.beneficiaries,
              }
            : {}),
        })
        .then(({ data }) => {
          setLoading(false);
          setPaid(true);
          window.location = "https://wa.me/+2348111228899";
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
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
          <div style={{ marginTop: "10px" }}>
            <img src={loader} alt="loader" />
          </div>
        ) : paid ? (
          <div className="group2">
            <h3>Payment successfull</h3>
          </div>
        ) : (
          <PaystackButton className="paystack-button" {...componentProps} />
        )}
      </div>
    </Container>
  );
};

export default Paystack;
