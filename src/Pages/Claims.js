import React, { useState } from "react";
import FormBuilder from "../components/Form";
import Container from "../components/Container";
import axios from "axios";

const isDev = process.env.NODE_ENV === 'development';

const CLOUDINARY_URL = `http${isDev ? '' : 's'}://api.cloudinary.com/v1_1/${
  process.env.REACT_APP_CL_NAME
}/upload`;

const claimsFormData = [
  {
    name: "policyNumber",
    label: "Policy number",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "dateOfLoss",
    label: "Date of Loss",
    validate: {
      required: "required",
    },
    type: "date",
  },
  {
    name: "file_url",
    label: "an image",
    validate: {
      required: "required",
    },
    type: "image",
  },
  {
    name: "description",
    label: "Description",
    validate: {
      required: "required",
    },
    type: "text",
  },
];

function Claims() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClaimsUpload(event) {
    console.log("loading...");
    var formdata = new FormData();
    // formdata.append("file", event.target.files[0]);
    formdata.append("file", event);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://wapicbot-api.herokuapp.com/api/media/create", requestOptions)
      .then((response) => response.json())
      .then(result => result.fileURL)
      .catch((error) => console.log("error", error));
  }

  const submitForm = async (values) => {
    setError(null);
    if (values.file_url) {
        const data = {
          file: values.file_url,
          folder: `5f6200d513833f0017840b4f/`,
          upload_preset: 'pb9zgwxy',
        };
        const r = await fetch(CLOUDINARY_URL, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        });
        const result = await r.json();
        console.log(result);
        values.file_url = result.secure_url;
      } 
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://wapicbot-api.herokuapp.com/api/claims/create",
        {
          policyNumber: values.policyNumber,
          dateOfLoss: values.dateOfLoss,
          file_attachment: [values.file_url],
          description: values.description,
        }
      );
      setLoading(false);
      console.log(data);
      console.log("fetched");
    } catch (error) {
      setLoading(false);
      if (error.response) setError(error.response.data.message);
      setError(error.response.data)
      console.log(error.response);
    }
  };
  return (
    <Container>
      <FormBuilder
        error={error}
        loading={loading}
        title="FNOL Claims Form "
        instruction="Please fill required fields to proceed"
        data={claimsFormData}
        action={(values) => submitForm(values)}
      />
    </Container>
  );
}

export default Claims;
