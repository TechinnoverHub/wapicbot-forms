import React, { useState } from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import axios from "axios";
import { useLocation } from "react-router-dom";

const OptIn = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submitForm = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams(location.search);
      const whatsappNo = searchParams.get("whatsapp");
      if (!whatsappNo) setLoading(false);
      const { data } = await axios.post(
        "https://wapicbot-api.herokuapp.com/api/auth/optin",
        {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          whatsappNo: `+${whatsappNo}`,
        }
      );
      console.log(data);
      window.location = "https://wa.me/+2348111228899";
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
        title="Whatsapp Opt-in "
        instruction="Please fill required fields to proceed"
        data={[
          {
            name: "customerType",
            label: "what type of customer are you?",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select your type",
            list: [
              "new",
              //  "existing customer"
            ],
          },
          {
            name: "firstName",
            label: "First Name",
            validate: {
              required: "required",
              max: [15, "Must be 15 characters or less"],
            },
            type: "text",
            dependent: {
              key: "customerType",
              value: "new",
            },
          },
          {
            name: "lastName",
            label: "Last Name",
            validate: {
              required: "required",
              max: [15, "Must be 15 characters or less"],
            },
            type: "text",
            dependent: {
              key: "customerType",
              value: "new",
            },
          },
          {
            name: "email",
            label: "Email",
            validate: {
              required: "required",
              email: "Invalid email address",
            },
            type: "email",
          },
          {
            name: "claim",
            label: "Claim Number",
            validate: {
              required: "required",
            },
            type: "number",
            dependent: {
              key: "customerType",
              value: "returning",
            },
          },
          {
            name: "wapicPolicy",
            label: "I accept wapic policy, terms and conditions.",
            validate: {
              required: "required",
            },
            type: "checkbox",
          },
          {
            name: "whatsappPolicy",
            label: "I accept to receive messages on whatsapp",
            validate: {
              required: "required",
            },
            type: "checkbox",
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

export default OptIn;
