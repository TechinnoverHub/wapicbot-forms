import React from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

const KYC = () => {
  // const location = useLocation();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const submitForm = async (values) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const searchParams = new URLSearchParams(location.search);
  //     const whatsappNo = searchParams.get("whatsapp");
  //     if (!whatsappNo) setLoading(false);
  //     const { data } = await axios.post(
  //       "https://wapicbot-api.herokuapp.com/api/auth/optin",
  //       {
  //         firstname: values.firstName,
  //         lastname: values.lastName,
  //         email: values.email,
  //         whatsappNo: `+${whatsappNo.trim()}`,
  //       }
  //     );
  //     console.log(data);
  //     window.location = "https://wa.me/+2348111228899";
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.response) {
  //       setError(error.response.data.message);
  //     }
  //     console.log(error.response);
  //   }
  // };
  return (
    <Container>
      <FormBuilder
        // error={error}
        // loading={loading}
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
            list: ["male", "female"],
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
            name: "houseAddress",
            label: "House Number & Address",
            validate: {
              required: "required",
              min: [10, "Must be 10 characters or more"],
            },
            type: "text",
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
            list: ["acountant", "administrator", "architect", "banker"],
          },
          {
            name: "businessType",
            label: "Business type",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select one",
            list: ["acountant", "administrator", "architect", "banker"],
          },

          {
            section: "Vehicle Information",
          },
          {
            name: "vinnumber",
            label: "Chassis/VIN Number",
            validate: {
              required: "required",
              min: [10, "Must be 10 characters or more"],
            },
            type: "text",
          },
          {
            name: "engineNumber",
            label: "Engine Number",
            validate: {
              required: "required",
              min: [10, "Must be 10 characters or more"],
            },
            type: "text",
          },
          {
            name: "color",
            label: "Color",
            validate: {
              required: "required",
              min: [10, "Must be 10 characters or more"],
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
            selectLabel: "select one",
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
            name: "bank",
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
          // if (values.customerType === "new customer") submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default KYC;
