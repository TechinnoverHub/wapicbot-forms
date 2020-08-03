import React from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
const products = {
  vehicle: [
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
      type: "textarea",
    },
    {
      name: "season",
      label: "what time",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["today", "tommorrow", "next"],
    },
  ],
  moovthirdparty: [
    {
      name: "vehicleClass",
      label: "Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: [
        "Cars/Sedan/SUV",
        "Private Buses and Pickup Trucks (Private Use Only) e.g Staff buses & Hilux",
        "Commercial Trucks (below 3 tonnes) e.g Mack & Mercedes trucks",
      ],
    },
    {
      name: "manufacturer",
      label: "Vehicle Make",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["Acura", "Audi", "BMW", "Cardilac"],
    },
    {
      name: "model",
      label: "Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["A4", "test", "second", "test3"],
    },
    {
      name: "policyholder",
      label: "Policyholder Type",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["Coporate", "Private"],
    },
    {
      name: "email",
      label: "Email Address",
      validate: {
        required: "required",
        min: [5, "Must be 15 characters or more"],
      },
      type: "text",
    },
    {
      name: "phone",
      label: "Phone Number",
      validate: {
        required: "required",
        max: [11, "Must be 15 characters"],
        min: [11, "Must be 15 characters"],
      },
      type: "text",
    },
  ],
};
const Insurances = () => {
  const { type } = useParams();
  return (
    <Container>
      <FormBuilder
        title="Fill Details"
        data={products[type] || []}
        action={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default Insurances;
