import React from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
const OptIn = () => {
  return (
    <Container>
      <FormBuilder
        title="Whatsapp Opt-in form"
        data={[
          {
            name: "customerType",
            label: "what type of customer are you?",
            validate: {
              required: "required",
            },
            type: "select",
            selectLabel: "select your type",
            list: ["new customer", "existing customer"],
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
              value: "new customer",
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
              value: "new customer",
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
              value: "existing customer",
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
          alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default OptIn;
