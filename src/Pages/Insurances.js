import React, { useState } from 'react';
import FormBuilder from '../components/Form';
import MultiForm from '../components/Form/MultiForm';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const isDev = process.env.NODE_ENV === 'development';
// import cloudinary from 'cloudinary/lib/cloudinary';
const CLOUDINARY_URL = `http${isDev ? '' : 's'}://api.cloudinary.com/v1_1/${
  process.env.REACT_APP_CL_NAME
}/upload`;

const medicalBenefitMap = {
  1000: 10000,
  2000: 10000,
  3000: 15000,
  4000: 20000,
  5000: 25000,
  6000: 30000,
  7000: 35000,
  8000: 40000,
  9000: 45000,
  10000: 50000,
  20000: 100000,
  50000: 150000,
  75000: 200000,
  100000: 250000,
};
const vehicleClassMap = {
  'private Cars': 'PRIVATE',
  'Commercial Buses & Vehicle': 'COMMERCIAL',
  'commercial Buses & Vehicle': 'BUSES',
  'trucks & General Cartage': 'TRUCKS',
  uber: 'UBER',
  'motor cycle': 'MOTORCYCLE',
};
const houseTypes = ['house-holders-insurance', 'house-owners-insurance'];
const lifeTypes = [
  'e-term',
  'smart-scholars-plan',
  'smart-life',
  'smart-senior-plan',
];
const vehicleType = [
  'moov-third-party',
  'moov-plus-(fire-and-theft)',
  'moov-luxury-(extented-comprehensive)',
  'moov-prestige-(private-comprehensive)',
  'moov-prestige-(commercial-comprehensive)',
];
const lifeinsurance = [
  {
    name: 'firstName',
    label: 'First Name',
    validate: {
      required: 'required',
    },
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    validate: {
      required: 'required',
    },
    type: 'text',
  },

  {
    name: 'phone',
    label: 'Phone',
    validate: {
      required: 'required',
      min: [11, 'Must be 11 characters or more'],
      max: [11, 'Must be 11 characters or more'],
    },
    type: 'text',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    validate: {
      required: 'required',
    },
    type: 'date',
  },
  {
    name: 'sumAssured',
    label: 'Sum Assured',
    validate: {
      required: 'required',
    },
    type: 'currency',
  },
  {
    name: 'duration',
    label: 'Duration (in years)',
    validate: {
      required: 'required',
    },
    type: 'number',
  },
  {
    name: 'annualContribution',
    label: 'Annual Contribution',
    validate: {
      required: 'required',
    },
    type: 'currency',
  },
  {
    name: 'message',
    label: 'Message',
    validate: {
      required: 'required',
      min: [5, 'Must be 5 characters or more'],
    },
    type: 'textarea',
  },
];
const eTermInsurance = [
  {
    name: 'firstName',
    label: 'First Name',
    validate: {
      required: 'required',
    },
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    validate: {
      required: 'required',
    },
    type: 'text',
  },

  {
    name: 'phone',
    label: 'Phone',
    validate: {
      required: 'required',
      min: [11, 'Must be 11 characters or more'],
      max: [11, 'Must be 11 characters or more'],
    },
    type: 'text',
  },
  {
    name: 'age',
    label: 'Age',
    validate: {
      required: 'required',
    },

    type: 'select',
    list: [...new Array(43)].map((num, i) => i + 18),
  },
  {
    name: 'annualPremium',
    label: 'Annual Premium',
    validate: {
      required: 'required',
    },
    type: 'select',
    setterKeys: ['sumAssured', 'medicalBenefit'],
    currency: true,
    action: (val, setter) => {
      setter(val * 100, medicalBenefitMap[val]);
    },
    list: [
      ...[...new Array(10)].map((num, i) => (i + 1) * 1000),
      20000,
      50000,
      75000,
      100000,
    ],
  },
  {
    name: 'sumAssured',
    label: 'Sum Assured',
    validate: {
      required: 'required',
    },
    type: 'select',
    setterKeys: ['annualPremium', 'medicalBenefit'],
    action: (val, setter) => {
      setter(val / 100, medicalBenefitMap[val / 100]);
    },
    list: [
      ...[...new Array(10)].map((num, i) => (i + 1) * 100000),
      2000000,
      5000000,
      7500000,
      10000000,
    ],
    currency: true,
  },
  {
    name: 'medicalBenefit',
    label: 'Medical Benefit',
    validate: {
      required: 'required',
    },
    disabled: true,
    type: 'currency',
  },
  {
    name: 'duration',
    label: 'Duration (in years)',
    validate: {
      required: 'required',
    },
    type: 'number',
  },
  {
    name: 'message',
    label: 'Message',
    validate: {
      required: 'required',
      min: [5, 'Must be 5 characters or more'],
    },
    type: 'textarea',
  },
];
const products = {
  'moov-third-party': [
    {
      name: 'vehicleClass',
      label: 'Vehicle Class',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: [
        'private Cars',
        'Commercial Buses & Vehicle',
        'trucks & General Cartage',
      ],
    },
    {
      name: 'manufacturer',
      data: 'manufacturers',
      label: 'select Manufacturer ',
      validate: {
        required: 'required',
      },
      type: 'select',
    },
    {
      name: 'model',
      label: 'Select Vehicle Model',
      validate: {
        required: 'required',
      },
      type: 'select',
      dependent: 'manufacturer',
      data: 'carModels',
    },
    {
      name: 'regNumber',
      label: 'Registration Number',
      validate: {
        required: 'required',
      },
      type: 'text',
    },
    {
      name: 'policyholder',
      label: 'Vehicle Type',
      validate: {
        required: 'required',
      },
      type: 'select',
      selectLabel: 'select one',
      list: ['Corporate Use', 'Private Use'],
    },

    {
      name: 'phone',
      label: 'Phone Number',
      validate: {
        required: 'required',
        max: [11, 'Must be 11 characters'],
        min: [11, 'Must be 11 characters'],
      },
      type: 'text',
    },
    {
      name: 'vehicleValue',
      label: 'Vehicle Value',
      validate: {
        required: 'required',
      },
      type: 'currency',
    },
  ],
  'moov-plus-(fire-and-theft)': [
    {
      name: 'vehicleClass',
      label: 'Select Vehicle Class',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['private Cars'],
    },
    {
      name: 'manufacturer',
      data: 'manufacturers',
      label: 'select Manufacturer ',
      validate: {
        required: 'required',
      },
      type: 'select',
    },
    {
      name: 'model',
      label: 'Select Vehicle Model',
      validate: {
        required: 'required',
      },
      type: 'select',
      dependent: 'manufacturer',
      data: 'carModels',
    },
    {
      name: 'regNumber',
      label: 'Registration Number',
      validate: {
        required: 'required',
      },
      type: 'text',
    },
    {
      name: 'policyholder',
      label: 'Vehicle Type',
      validate: {
        required: 'required',
      },
      selectLabel: 'select one',
      type: 'select',
      list: ['Corporate Use', 'Private Use'],
    },

    {
      name: 'phone',
      label: 'Phone Number',
      validate: {
        required: 'required',
        max: [11, 'Must be 11 characters'],
        min: [11, 'Must be 11 characters'],
      },
      type: 'text',
    },
    {
      name: 'vehicleValue',
      label: 'Vehicle value',
      validate: {
        required: 'required',
      },
      type: 'currency',
    },
    {
      name: 'floodExtension',
      label: 'Flood Extension',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes', 'no'],
    },
    {
      name: 'excessBuyBack',
      label: 'Excess Buy Back',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes', 'no'],
    },
    {
      name: 'vehicleTracking',
      label: 'Would you want Vehicle Tracking?',
      validate: {
        // required: "required",
      },
      type: 'select',
      list: ['yes', 'no'],
    },
  ],
  'moov-luxury-(extented-comprehensive)': [
    {
      name: 'vehicleClass',
      label: 'Select Vehicle Class',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['private Cars'],
    },
    {
      name: 'manufacturer',
      data: 'manufacturers',
      label: 'select Manufacturer ',
      validate: {
        required: 'required',
      },
      type: 'select',
    },
    {
      name: 'model',
      label: 'Select Vehicle Model',
      validate: {
        required: 'required',
      },
      type: 'select',
      dependent: 'manufacturer',
      data: 'carModels',
    },
    {
      name: 'regNumber',
      label: 'Registration Number',
      validate: {
        required: 'required',
      },
      type: 'text',
    },
    {
      name: 'policyholder',
      label: 'Vehicle Type',
      validate: {
        required: 'required',
      },
      selectLabel: 'select one',
      type: 'select',
      list: ['Corporate Use', 'Private Use'],
    },

    {
      name: 'phone',
      label: 'Phone Number',
      validate: {
        required: 'required',
        max: [11, 'Must be 11 characters'],
        min: [11, 'Must be 11 characters'],
      },
      type: 'text',
    },
    {
      name: 'vehicleValue',
      label: 'Vehicle value',
      validate: {
        required: 'required',
      },
      type: 'currency',
    },
    {
      name: 'floodExtension',
      label: 'Flood Extension',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes'],
    },
    {
      name: 'excessBuyBack',
      label: 'Excess Buy Back',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes'],
    },
    {
      name: 'vehicleTracking',
      label: 'Would you want Vehicle Tracking?',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes'],
    },
  ],
  'moov-prestige-(private-comprehensive)': [
    {
      name: 'vehicleClass',
      label: 'Select Vehicle Class',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['private Cars'],
    },
    {
      name: 'manufacturer',
      data: 'manufacturers',
      label: 'select Manufacturer ',
      validate: {
        required: 'required',
      },
      type: 'select',
    },
    {
      name: 'model',
      label: 'Select Vehicle Model',
      validate: {
        required: 'required',
      },
      type: 'select',
      dependent: 'manufacturer',
      data: 'carModels',
    },
    {
      name: 'regNumber',
      label: 'Registration Number',
      validate: {
        required: 'required',
      },
      type: 'text',
    },
    {
      name: 'policyholder',
      label: 'Vehicle Type',
      validate: {
        required: 'required',
      },
      selectLabel: 'select one',
      type: 'select',
      list: ['Corporate Use', 'Private Use'],
    },

    {
      name: 'phone',
      label: 'Phone Number',
      validate: {
        required: 'required',
        max: [11, 'Must be 11 characters'],
        min: [11, 'Must be 11 characters'],
      },
      type: 'text',
    },
    {
      name: 'vehicleValue',
      label: 'Vehicle value',
      validate: {
        required: 'required',
      },
      type: 'currency',
    },
    {
      name: 'floodExtension',
      label: 'Flood Extension',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: ['yes', 'no'],
    },
    {
      name: 'vehicleTracking',
      label: 'Would you want Vehicle Tracking?',
      validate: {
        // required: "required",
      },
      type: 'select',
      list: ['yes', 'no'],
    },
  ],
  'moov-prestige-(commercial-comprehensive)': [
    {
      name: 'vehicleClass',
      label: 'Select Vehicle Class',
      validate: {
        required: 'required',
      },
      type: 'select',
      list: [
        'commercial Buses & Vehicle',
        'trucks & General Cartage',
        'uber',
        'motor cycle',
      ],
    },
    {
      name: 'manufacturer',
      data: 'manufacturers',
      label: 'select Manufacturer ',
      validate: {
        required: 'required',
      },
      type: 'select',
    },
    {
      name: 'model',
      label: 'Select Vehicle Model',
      validate: {
        required: 'required',
      },
      type: 'select',
      dependent: 'manufacturer',
      data: 'carModels',
    },
    {
      name: 'regNumber',
      label: 'Registration Number',
      validate: {
        required: 'required',
      },
      type: 'text',
    },
    {
      name: 'policyholder',
      label: 'Vehicle Type',
      validate: {
        required: 'required',
      },
      selectLabel: 'select one',
      type: 'select',
      list: ['Commercial Use', 'Private Use'],
    },

    {
      name: 'phone',
      label: 'Phone Number',
      validate: {
        required: 'required',
        max: [11, 'Must be 11 characters'],
        min: [11, 'Must be 11 characters'],
      },
      type: 'text',
    },
    {
      name: 'vehicleValue',
      label: 'Vehicle value',
      validate: {
        required: 'required',
      },
      type: 'currency',
    },
  ],
  'e-term': eTermInsurance,
  'smart-scholars-plan': lifeinsurance,
  'smart-life': lifeinsurance,
  'smart-senior-plan': lifeinsurance,
};
const Insurances = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { type, userId } = useParams();
  return (
    <Container>
      {houseTypes.includes(type) && (
        <MultiForm
          title='Fill Details'
          error={error}
          loading={loading}
          action={async (values) => {
            try {
              setLoading(true);
              setError(null);
              console.log(values);
              const valuesToUpload = await Promise.all(
                values.map(async (val) => {
                  const newVal = { ...val };
                  if (newVal.image) {
                    console.log(newVal.image);
                    const data = {
                      file: newVal.image,
                      folder: `${userId}/`,
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
                    newVal.image = result.secure_url;
                    // await cloudinary.v2.uploader.upload(
                    //   newVal.image,
                    //   {
                    //     folder: `${userId}/`,
                    //     agent: {
                    //       headers: {
                    //         'Access-Control-Allow-Origin': '*',
                    //         'Access-Control-Allow-Methods':
                    //           'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    //         'Access-Control-Allow-Headers':
                    //           'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    //       },
                    //     },
                    //   },
                    //   (error, result) => {
                    //     if (error) {
                    //       setLoading(false);
                    //     } else {
                    //       newVal.image = result.secure_url;
                    //     }
                    //   }
                    // );
                  }
                  return newVal;
                })
              );
              console.log(valuesToUpload);

              const { data } = await axios.post(
                'https://wapicbot-api.herokuapp.com/api/products/get-quote',
                // "https://ec4174a4ecad.ngrok.io/api/products/get-quote",
                {
                  items: valuesToUpload,
                  productCode: type,
                }
              );
              console.log(data);
              setLoading(false);
              history.push(`/quote-success/${userId}`, {
                productType: type,
                quote: data.data.quote,
              });
            } catch (error) {
              setLoading(false);
              if (error.response) {
                setError(error.response.data.message);
              }
              console.log(error.response, error, 'errores');
            }
          }}
          template={{
            name: '',
            value: null,
          }}
        />
      )}
      {vehicleType.includes(type) && (
        <FormBuilder
          error={error}
          loading={loading}
          title='Fill Details'
          data={products[type] || []}
          action={async (values) => {
            setLoading(true);
            setError(null);
            console.log(values);
            try {
              const { data } = await axios.post(
                'https://wapicbot-api.herokuapp.com/api/products/get-quote',
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
              history.push(`/quote-success/${userId}`, {
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
      )}
      {lifeTypes.includes(type) && (
        <FormBuilder
          error={error}
          loading={loading}
          title='Fill Details'
          data={products[type] || []}
          action={async (values) => {
            setLoading(true);
            setError(null);
            console.log(values);
            try {
              const { data } = await axios.post(
                'https://wapicbot-api.herokuapp.com/api/products/get-quote',
                // "https://ec4174a4ecad.ngrok.io/api/products/get-quote",
                {
                  contribution: values.annualPremium,
                  pd: values.medicalBenefit,
                  demise: values.sumAssured,
                  frequency: 'Y',
                  duration: values.duration,
                  age: values.age,
                  productCode: type,
                }
              );
              console.log(data);
              setLoading(false);
              history.push(`/quote-success/${userId}`, {
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
      )}
    </Container>
  );
};

export default Insurances;
