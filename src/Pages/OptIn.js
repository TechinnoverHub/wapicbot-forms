import React, { useState } from 'react';
import FormBuilder from '../components/Form';
import Container from '../components/Container';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const optinFormData = [
  {
    name: 'customerType',
    label: 'what type of customer are you?',
    validate: {
      required: 'required',
    },
    type: 'select',
    selectLabel: 'select one',
    list: ['new customer', 'returning customer'],
  },
  {
    name: 'firstName',
    label: 'First Name',
    validate: {
      required: 'required',
    },
    type: 'text',
    dependent: {
      key: 'customerType',
      value: 'new customer',
    },
  },
  {
    name: 'middlename',
    label: 'Middle Name',
    validate: {
      required: 'required',
    },
    type: 'text',
    dependent: {
      key: 'customerType',
      value: 'new customer',
    },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    validate: {
      required: 'required',
    },
    type: 'text',
    dependent: {
      key: 'customerType',
      value: 'new customer',
    },
  },
  {
    name: 'email',
    label: 'Email',
    validate: {
      required: 'required',
      email: 'Invalid email address',
    },
    type: 'email',
  },
  {
    name: 'policyNumber',
    label: 'Policy Number',
    validate: {
      required: 'required',
    },
    type: 'number',
    dependent: {
      key: 'customerType',
      value: 'returning customer',
    },
  },
  {
    name: 'wapicPolicy',
    label:
      'I accept coronation insurance policy, terms and conditions and also I accept to receive messages on whatsapp',
    validate: {
      required: 'required',
    },
    type: 'checkbox',
  },
];
const OptIn = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (values) => {
    setError(null);
    try {
      setLoading(true);
      const searchParams = new URLSearchParams(location.search);

      if (!values.wapicPolicy) {
        setError('Please accept the policies');
        return setLoading(false);
      }
      const whatsappNo = searchParams.get('whatsapp');
      const conversationId = searchParams.get('conversationId');
      if (!whatsappNo) return setLoading(false);
      const { data } = await axios.post(
        'https://wapicbot-api.herokuapp.com/api/auth/optin',
        {
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          whatsappNo: `+${whatsappNo.trim()}`,
          conversationId,
        }
      );
      window.location = 'https://wa.me/+2348111228899';
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
        title='Whatsapp Opt-in '
        instruction='Please fill required fields to proceed'
        data={optinFormData}
        action={(values) => {
          if (values.customerType === 'new customer') submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default OptIn;
