import React, { useState } from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import axios from "axios";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
const optinFormData = [
  {
    name: "customerType",
    label: "what type of customer are you?",
    validate: {
      required: "required",
    },
    type: "select",
    selectLabel: "select one",
    list: ["new customer", "returning customer"],
  },
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
    dependent: {
      key: "customerType",
      value: "new customer",
    },
  },
  {
    name: "middlename",
    label: "Middle Name",
    validate: {
      required: "required",
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
    name: "AccountType",
    label: "Select Your Account Type",
    validate: {
      required: "required",
    },
    type: "select",
    selectLabel: "select one",
    list: ["AGENT", "CUSTOMER"],
  },
  {
    name: "policyNumber",
    label: "Policy Number",
    validate: {
      required: "required",
    },
    type: "number",
    dependent: {
      key: "customerType",
      value: "returning customer",
    },
  },
  {
    name: "wapicPolicy",
    label: (
      <span style={{ fontSize: "14px" }}>
        I accept coronation insurance{" "}
        <button
          onClick={() =>
            swal(
              "Policy, terms and conditions",
              `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

          Why do we use it?
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          
          
          Where does it come from?
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
              "info"
            )
          }
          style={{
            border: "none",
            background: "none",
            fontSize: "14px",
            padding: 0,
            cursor: "pointer",
            outline: "none",
            borderBottom: "1px solid #883395",
          }}
        >
          policy, terms and conditions
        </button>{" "}
        and also I accept to receive messages on whatsapp
      </span>
    ),

    validate: {
      required: "required",
    },
    type: "checkbox",
  },
];
const OptIn = () => {
  const location = useLocation();
  let { referee } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (values) => {
    setError(null);
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);

      if (!values.wapicPolicy) {
        setError("Please accept the policies");
        return setLoading(false);
      }
      const whatsappNo = searchParams.get("whatsapp");
      const conversationId = searchParams.get("conversationId");
      if (!whatsappNo) return setLoading(false);
      const { data } = await axios.post(
        "https://wapicbot-api.herokuapp.com/api/auth/optin",
        {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          whatsappNo: `+${whatsappNo.trim()}`,
          conversationId,
          accountType: values.accountType,
          referee: referee !== undefined ? referee : undefined,
        }
      );
      window.location = "https://wa.me/+2348111228899";
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) setError(error.response.data.message);
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
        data={optinFormData}
        action={(values) => {
          if (values.customerType === "new customer") submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default OptIn;
