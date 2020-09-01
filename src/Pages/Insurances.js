import React, { useState } from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import axios from "axios";

const vehicleClassMap = {
  "private Cars": "PRIVATE",
  "Commercial Buses & Vehicle": "COMMERCIAL",
  "commercial Buses & Vehicle": "BUSES",
  "trucks & General Cartage": "TRUCKS",
  uber: "UBER",
  "motor cycle": "MOTORCYCLE",
};
const products = {
  "moov-third-party": [
    {
      name: "vehicleClass",
      label: "Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: [
        "private Cars",
        "Commercial Buses & Vehicle",
        "trucks & General Cartage",
      ],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "policyholder",
      label: "Vehicle Type",
      validate: {
        required: "required",
      },
      type: "select",
      selectLabel: "select one",
      list: ["Corporate Use", "Private Use"],
    },

    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 11 characters"],
        min: [11, "Must be 11 characters"],
      },
      type: "text",
    },
    {
      name: "vehicleValue",
      label: "Vehicle Value",
      validate: {
        required: "required",
      },
      type: "number",
    },
  ],
  "moov-plus-(fire-and-theft)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "policyholder",
      label: "Vehicle Type",
      validate: {
        required: "required",
      },
      selectLabel: "select one",
      type: "select",
      list: ["Corporate Use", "Private Use"],
    },

    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 11 characters"],
        min: [11, "Must be 11 characters"],
      },
      type: "text",
    },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "floodExtension",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "vehicleTracking",
      label: "Would you want Vehicle Tracking?",
      validate: {
        // required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
  ],
  "moov-luxury-(extented-comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "policyholder",
      label: "Vehicle Type",
      validate: {
        required: "required",
      },
      selectLabel: "select one",
      type: "select",
      list: ["Corporate Use", "Private Use"],
    },

    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 11 characters"],
        min: [11, "Must be 11 characters"],
      },
      type: "text",
    },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "floodExtension",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes"],
    },
    {
      name: "vehicleTracking",
      label: "Would you want Vehicle Tracking?",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes"],
    },
  ],
  "moov-prestige-(private-comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "policyholder",
      label: "Vehicle Type",
      validate: {
        required: "required",
      },
      selectLabel: "select one",
      type: "select",
      list: ["Corporate Use", "Private Use"],
    },

    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 11 characters"],
        min: [11, "Must be 11 characters"],
      },
      type: "text",
    },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "floodExtension",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "vehicleTracking",
      label: "Would you want Vehicle Tracking?",
      validate: {
        // required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
  ],
  "moov-prestige-(commercial-comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: [
        "commercial Buses & Vehicle",
        "trucks & General Cartage",
        "uber",
        "motor cycle",
      ],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    {
      name: "policyholder",
      label: "Vehicle Type",
      validate: {
        required: "required",
      },
      selectLabel: "select one",
      type: "select",
      list: ["Commercial Use", "Private Use"],
    },

    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 11 characters"],
        min: [11, "Must be 11 characters"],
      },
      type: "text",
    },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
      },
      type: "text",
    },
  ],
  lifeinsurance: [
    {
      name: "firstName",
      label: "First Name",
      validate: {
        required: "required",
        min: [5, "Must be 5 characters or more"],
      },
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      validate: {
        required: "required",
        min: [5, "Must be 5 characters or more"],
      },
      type: "text",
    },

    {
      name: "phone",
      label: "Phone",
      validate: {
        required: "required",
        min: [11, "Must be 11 characters or more"],
        max: [11, "Must be 11 characters or more"],
      },
      type: "text",
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
      name: "sumAssured",
      label: "Sum Assured",
      validate: {
        required: "required",
      },
      type: "number",
    },
    {
      name: "duration",
      label: "Duration",
      validate: {
        required: "required",
      },
      type: "number",
    },
    {
      name: "annualContribution",
      label: "Annual Contribution",
      validate: {
        required: "required",
      },
      type: "number",
    },
    {
      name: "message",
      label: "Message",
      validate: {
        required: "required",
        min: [5, "Must be 5 characters or more"],
      },
      type: "textarea",
    },
  ],
};
const Insurances = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { type } = useParams();
  return (
    <Container>
      <FormBuilder
        error={error}
        loading={loading}
        title="Fill Details"
        data={products[type] || []}
        action={async (values) => {
          setLoading(true);
          setError(null);
          console.log(values);
          try {
            const { data } = await axios.post(
              "https://wapicbot-api.herokuapp.com/api/products/get-quote",
              // "https://ec4174a4ecad.ngrok.io/api/products/get-quote",
              {
                vehicleClass: vehicleClassMap[values.vehicleClass],
                regNumber: values.regNumber,
                type: values.policyholder,
                make: values.manufacturer,
                model: values.model,
                worth: values.vehicleValue,
                productCode: type,
              }
            );
            console.log(data);
            setLoading(false);
            history.push("/quote-success", {
              ...values,
              productType: type,
              quote: data.data.quote,
            });
          } catch (error) {
            setLoading(false);
            if (error.response) {
              setError(error.response.data.message);
            }
            console.log(error.response);
          }
        }}
      />
    </Container>
  );
};

export default Insurances;
