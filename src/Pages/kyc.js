import React, { useState, useEffect } from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import includesAll from "../utils/includesAll";
// import formatNum from "../utils/formatNum";
const vehicleType = [
    "moov-third-party",
    "moov-plus-(fire-and-theft)",
    "moov-luxury-(extented-comprehensive)",
    "moov-prestige-(private-comprehensive)",
    "moov-prestige-(commercial-comprehensive)",
  ];
const pickExtraData = (type) => {
  const vehicleType = [
    "moov-third-party",
    "moov-plus-(fire-and-theft)",
    "moov-luxury-(extented-comprehensive)",
    "moov-prestige-(private-comprehensive)",
    "moov-prestige-(commercial-comprehensive)",
  ];
  if (vehicleType.includes(type)) {
    return [
      {
        section: "Vehicle Information",
      },
      {
        name: "vinnumber",
        label: "Chassis/VIN Number",
        validate: {
          required: "required",
          // min: [10, "Must be 10 characters or more"],
        },
        type: "text",
      },
      {
        name: "engineNumber",
        label: "Engine Number",
        validate: {
          required: "required",
          // min: [10, "Must be 10 characters or more"],
        },
        type: "text",
      },
      {
        name: "color",
        label: "Color",
        validate: {
          required: "required",
          // min: [10, "Must be 10 characters or more"],
        },
        type: "text",
      },
      {
        name: "yearOfModel",
        label: "Year of Model",
        validate: {
          required: "required",
        },
        type: "select",
        list: [
          "2020",
          "2019",
          "2018",
          "2017",
          "2016",
          "2015",
          "2014",
          "2013",
          "2012",
          "2011",
          "2010",
          "2009",
          "2008",
          "2007",
          "2006",
          "2005",
          "2004",
          "2003",
          "2002",
          "2001",
          "2000",
          "1999",
          "1998",
          "1997",
          "1996",
          "1995",
          "1994",
          "1993",
          "1992",
          "1991",
          "1990",
        ],
      },
    ];
  }
  return [];
};
const KYC = (props) => {
  // const location = useLocation();
  const [quoteDetails, setQuoteDetails] = useState({});
  useEffect(() => {
    const states = Object.keys(props.location.state || {});
  
     if(props.location.state) {
    if(vehicleType.includes(props.location.state.productType)) {
        const isValid = includesAll(states, [
      "vehicleClass",
      "manufacturer",
      "model",
      "policyholder",
      "vehicleValue",
      "product",
      "quote",
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
      product,
      quote,
      productType,
    } = props.location.state;

    setQuoteDetails({
      vehicleClass,
      manufacturer,
      model,
      policyholder,
      vehicleValue,
      product,
      quote,
      productType,
    });
    }

    const {
      productType,
      product,
      quote,
    } = props.location.state;
    setQuoteDetails({ 
      product,
      productType:productType,
      quote:quote,})
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submitForm = async (values) => {
    setLoading(true);
    setError(null);
    try {
      // const searchParams = new URLSearchParams(location.search);
      // const whatsappNo = searchParams.get("whatsapp");/
      // if (!whatsappNo) setLoading(false);
      const { data } = await axios.post(
        "https://wapicbot-api.herokuapp.com/api/users/update-kyc",
        {
          gender: values.gender,
          dob: values.dateOfBirth,
          maritalStatus: values.maritalStatus,
          religion: values.religon,
          height: values.height,
          weight: values.weight,
          state: values.state,
          occupation: values.occupation,
          businessType: values.businessType,
          bankName: values.bankName,
          accountNumber: values.accountNumber,
          bvn: values.bvn,
        }
      );
      console.log(data);
      props.history.push("/pay", quoteDetails);
      // window.location = "https://wa.me/+2348111228899";
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      }
      console.log(error.response);
    }
  };
  return (
    <Container>
      <FormBuilder
        error={error}
        loading={loading}
        title="KYC"
        instruction="Please fill required fields to proceed"
        data={[
          {
            section: "Personal information",
          },
          {
            name: "gender",
            label: "Gender",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: ["MALE", "FEMALE"],
          },

          {
            name: "dateOfBirth",
            label: "Date of Birth",
            validate: {
              required: "required",
            },
            type: "date",
          },
          {
            name: "maritalStatus",
            label: "Marital Status",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: ["divorced", "married", "single", "widowed"],
          },
          {
            name: "religion",
            label: "Religion",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: [
              "BUDDISH",
              "CHINESE FOLK RELIGION",
              "CHRISTIANITY",
              "HINDUISM",
              "ISLAM",
              "NOT APPLICABLE",
              "OTHERS",
              "TRADITIONAL WORSHIPPER",
            ],
          },
          {
            name: "height",
            label: "Height (meters)",
            validate: {
              // required: "required",
            },
            type: "number",
          },
          {
            name: "weight",
            label: "Weight (Kg)",
            validate: {
              // required: "required",
              // min: [10, "Must be 10 characters or more"],
            },
            type: "number",
          },
          {
            name: "state",
            label: "State",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            data: "allStates",
          },
          {
            name: "city",
            label: "Select city",
            validate: {
              required: "required",
            },
            type: "select",
            dependent: "state",
            data: "allLgas",
          },

          {
            name: "occupation",
            label: "Occupation",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: [
              "accountant",
              "administrator",
              "architect",
              "banker",
              "beautician",
              "business trader",
              "caterer",
              "civil servant",
              "cleric",
              "communication technologies",
              "educationist",
              "engineer",
              "farmer",
              "fashion designer",
              "financial services consul",
              "horologist",
              "horticulturist",
              "importer and exporter",
              "information technologist",
              "journalist",
              "legal practitioner",
              "merchant",
              "military personnel",
              "not applicable",
              "NYSC member",
              "others",
              "pilot",
              "retired",
              "sailor",
              "scientist",
              "secretary",
              "student",
              "surveyor",
              "system analyst",
              "transporter",
            ],
          },
          {
            name: "businessType",
            label: "Business type",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: [
              "financial services",
              "manufacturing",
              "oil & gas",
              "others",
              "public sector",
              "retail customer",
              "services",
              "sme",
              "telecoms",
              "transportation",
            ],
          },
          ...pickExtraData(quoteDetails.productType),
          {
            section: "Cover & Bank Information",
          },

          {
            name: "coverStartDate",
            label: "Cover Start Date",
            validate: {
              required: "required",
            },
            type: "date",
          },
          {
            name: "bankName",
            label: "Bank Name",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            data: "allBanks",
            // list: ["access", "diamond", "zenith", "GTB"],
          },
          {
            name: "accountNumber",
            label: "Account Number",
            validate: {
              required: "required",
              min: [10, "Must be 10 characters or more"],
            },
            type: "number",
          },
          {
            name: "bvn",
            label: "Bank Verification Number (optional)",
            validate: {
              // required: "required",
              min: [10, "Must be 10 characters or more"],
            },
            type: "number",
          },
        ]}
        action={(values) => {
          submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default KYC;
