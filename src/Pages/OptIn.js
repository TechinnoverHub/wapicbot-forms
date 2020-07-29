import React from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
const OptIn = () => {
  return (
    <Container>
      <FormBuilder
        title="Fill Details"
        data={[
          {
            name: "firstName",
            label: "First Name",
            validate: {
              required: "required",
              max: [15, "Must be 15 characters or less"],
            },
            type: "text",
          },
          {
            name: "lastName",
            label: "Last Name",
            validate: {
              required: "required",
              max: [15, "Must be 15 characters or less"],
            },
            type: "text",
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
          },
          {
            name: "moreDetail",
            label: "Gist us",
            validate: {
              // required: "required",
            },
            type: "text",
            textarea: true,
          },
        ]}
        action={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default OptIn;
