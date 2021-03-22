import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import logo from "../assets/logo.png";
import loader from "../assets/loader.gif";
import includesAll from "../utils/includesAll";
import formatNum from "../utils/formatNum";
import { PolicyIDContext } from "../context/policyPurchased";
import { QuoteContext } from "../context/quoteData";
const vehicleType = [
  "moov-third-party",
  "moov-plus-(fire-and-theft)",
  "moov-luxury-(extented-comprehensive)",
  "moov-prestige-(private-comprehensive)",
  "commercial-vehicle-(comprehensive)",
];
const lifeTypes = [
  "e-term",
  "smart-scholars-plan",
  "smart-life",
  "smart-senior-plan",
];
const publicKey = process.env.REACT_APP_PAYSTACK;
const Paystack = (props) => {
  let [payloadContext] = useContext(PolicyIDContext);
  const policyPurchasedId = localStorage.getItem("policyPurchasedId")
  console.log(policyPurchasedId)
  let [quoteData] = useContext(QuoteContext);

  const [quoteDetails, setQuoteDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const { userId } = useParams();
  useEffect(() => {
    const states = Object.keys(props.location.state || {});
    const isNotThirdparty =
      props.location.state.productType !== "moov-third-party";
    const isValid = includesAll(states, [
      "product",
      "quote",
      "productType",
      "email",
      "firstname",
      "whatsappNo",
      "coverStartDate",
      ...(vehicleType.includes(props.location.state.productType)
        ? [
            "manufacturer",
            "model",
            "engineNumber",
            "vinnumber",
            "regNumber",
            "color",
            "yearOfModel",
            ...(isNotThirdparty
              ? [
                  "vehicleFrontImage",
                  "vehicleBackImage",
                  "vehicleLeftImage",
                  "vehicleRightImage",
                ]
              : []),
            "vehicleLicence",
          ]
        : []),
      ...(lifeTypes.includes(props.location.state.productType)
        ? ["beneficiaries"]
        : []),
    ]);

    if (!isValid) {
      window.location = "https://wa.me/+2348111228899";
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
      vehicleFrontImage,
      vehicleBackImage,
      vehicleLeftImage,
      vehicleRightImage,
      coverStartDate,
      vehicleLicence,
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
      coverStartDate,
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
            vehicleFrontImage,
            vehicleBackImage,
            vehicleLeftImage,
            vehicleRightImage,
            vehicleLicence,
          }
        : {}),
      ...(lifeTypes.includes(props.location.state.productType)
        ? {
            beneficiaries,
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
      // console.log(data);
      console.log('last-data', {
        age: quoteData.age,
        annualPremium: quoteData.annualPremium,
        duration: quoteData.duration,
        firstName: quoteData.firstName,
        frequency: quoteData.frequency,
        lastName: quoteData.lastName,
        txRef: data.trxref,
        user: userId,
        policyPurchasedId: payloadContext,
        policyInfo: {
          productCode: quoteDetails.productType,
          startDate: quoteDetails.coverStartDate,
          premiumLC: quoteDetails.quote,
        }})

      axios
        .post("https://wapicbot-api.herokuapp.com/api/products/buy-policy", {
          age: quoteData.age,
          annualPremium: quoteData.annualPremium,
          duration: quoteData.duration,
          firstName: quoteData.firstName,
          frequency: quoteData.frequency,
          lastName: quoteData.lastName,
          txRef: data.trxref,
          user: userId,
          policyPurchasedId: payloadContext,
          // productCode: quoteDetails.productType,
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
                  vehicleFrontImage: quoteDetails.vehicleFrontImage,
                  vehicleBackImage: quoteDetails.vehicleBackImage,
                  vehicleLeftImage: quoteDetails.vehicleLeftImage,
                  VehicleRightImage: quoteDetails.VehicleRightImage,
                  vehicleLicence: quoteDetails.vehicleLicence,
                },
              }
            : {}),
          ...(lifeTypes.includes(props.location.state.productType)
            ? {
                beneficiaries: quoteDetails.beneficiaries,
              }
            : {}),
        })
        .then(({ data }) => {
          localStorage.removeItem('policyPurchasedId')
          setLoading(false);
          console.log("pstaData", data);
          setPaid(true);
          window.location = "https://wa.me/+2348111228899";
        })
        .catch((err) => {
          console.log(err);
          setPaid(true);
          setLoading(false);
          window.location = "https://wa.me/+2348111228899";
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
            <h3>Payment successful</h3>
          </div>
        ) : (
          <PaystackButton className="paystack-button" {...componentProps} />
        )}
      </div>
    </Container>
  );
};

export default Paystack;
