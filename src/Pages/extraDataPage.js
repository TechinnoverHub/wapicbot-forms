import React, { useState, useEffect } from 'react';
import FormBuilder from '../components/Form';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import includesAll from '../utils/includesAll';
// import formatNum from "../utils/formatNum";
const isDev = process.env.NODE_ENV === 'development';

const CLOUDINARY_URL = `http${isDev ? '' : 's'}://api.cloudinary.com/v1_1/${
  process.env.REACT_APP_CL_NAME
}/upload`;

const vehicleType = [
  'moov-third-party',
  'moov-plus-(fire-and-theft)',
  'moov-luxury-(extented-comprehensive)',
  'moov-prestige-(private-comprehensive)',
  'commercial-vehicle-(comprehensive)',
];
const lifeTypes = [
  'e-term',
  'smart-scholars-plan',
  'smart-life',
  'smart-life-plus',
  'smart-senior-plan',
];
const pickExtraData = (type, action) => {
  const vehicleType = [
    'moov-third-party',
    'moov-plus-(fire-and-theft)',
    'moov-luxury-(extented-comprehensive)',
    'moov-prestige-(private-comprehensive)',
    'commercial-vehicle-(comprehensive)',
  ];

  if (vehicleType.includes(type)) {
    return [
      ...(type !== 'moov-third-party'
        ? [
            {
              section: 'Vehicle images',
            },
            {
              name: 'vehicleFrontImage',
              label: 'Vehicle Front Image',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
            {
              name: 'vehicleBackImage',
              label: 'Vehicle Back Image',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
            {
              name: 'vehicleLeftImage',
              label: 'Vehicle Left Side Image',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
            {
              name: 'vehicleRightImage',
              label: 'Vehicle Right Side Image',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
          ]
        : []),
      {
        section: 'Vehicle Licence/Proof of Ownership',
      },
      {
        name: 'vehicleLicence',
        label: 'Vehicle Licence',
        validate: {
          required: 'required',
        },
        type: 'image',
      },
      {
        section: 'Vehicle Information',
      },
      {
        name: 'vinnumber',
        label: 'Chassis/VIN Number',
        validate: {
          required: 'required',
          // min: [10, "Must be 10 characters or more"],
        },
        type: 'text',
      },
      {
        name: 'engineNumber',
        label: 'Engine Number',
        validate: {
          required: 'required',
          // min: [10, "Must be 10 characters or more"],
        },
        type: 'text',
      },
      {
        name: 'color',
        label: 'Color',
        validate: {
          required: 'required',
        },
        type: 'text',
      },
      {
        name: 'yearOfModel',
        label: 'Year of Model',
        validate: {
          required: 'required',
        },
        type: 'select',
        list: [
          '2020',
          '2019',
          '2018',
          '2017',
          '2016',
          '2015',
          '2014',
          '2013',
          '2012',
          '2011',
          '2010',
          '2009',
          '2008',
          '2007',
          '2006',
          '2005',
          '2004',
          '2003',
          '2002',
          '2001',
          '2000',
          '1999',
          '1998',
          '1997',
          '1996',
          '1995',
          '1994',
          '1993',
          '1992',
          '1991',
          '1990',
        ],
      },
    ];
  }
  if (lifeTypes.includes(type)) {
    return [
      {
        section: 'Beneficiaries',
      },
      {
        setError: action,
        name: 'beneficiaries',
        label: 'beneficiaries',
        type: 'multiadd',
        max: 3,
        template: [
          { name: 'firstname', label: 'First Name', type: 'text' },
          { name: 'lastname', label: 'Last Name', type: 'text' },
          { name: 'dob', label: 'Date of Birth', type: 'date' },
          { name: 'share', label: 'Share (%)', type: 'number' },
          {
            name: 'relationship',
            label: 'Relationship',
            type: 'select',
            list: ['Father', 'Mother', 'Son', 'Daughter', 'Sibling', 'Cousin'],
          },
          { name: 'phone', label: 'Phone Number', type: 'phone' },
          { name: 'houseNumber', label: 'House Number', type: 'number' },
          { name: 'street', label: 'Street', type: 'text' },
          { name: 'city', label: 'City', type: 'text' },
          { name: 'state', label: 'State', type: 'text' },
          { name: 'country', label: 'Country', type: 'text' },
        ],
      },
    ];
  }
  return [];
};

const ExtraDataPage = (props) => {
  // const location = useLocation();
  const [quoteDetails, setQuoteDetails] = useState({});
  const { userId } = useParams();
  useEffect(() => {
    console.log(props.location.state);
    const states = Object.keys(props.location.state || {});

    if (props.location.state) {
      if (vehicleType.includes(props.location.state.productType)) {
        const isValid = includesAll(states, [
          'vehicleClass',
          'manufacturer',
          'model',
          'policyholder',
          'vehicleValue',
          'product',
          'quote',
          'regNumber',
          'productType',
        ]);

        console.log(isValid, props, states);
        if (!isValid) {
          window.location = 'https://wa.me/+2348111228899';
          // return;
        }
        const { productType } = props.location.state;

        setQuoteDetails({
          productType,
        });
      } else {
        const { productType } = props.location.state;

        setQuoteDetails({
          productType,
        });
      }
    } else {
      window.location = 'https://wa.me/+2348111228899';
    }
  }, [props]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (values) => {
    setLoading(true);
    setError(null);
    try {
      if (vehicleType.includes(props.location.state.productType)) {
        const isNotThirdparty =
          props.location.state.productType !== 'moov-third-party';
        if (values.vehicleFrontImage) {
          const data = {
            file: values.vehicleFrontImage,
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
          values.vehicleFrontImage = result.secure_url;
        } else {
          if (isNotThirdparty) {
            setLoading(false);
            return setError('Vehicle Front Image is required');
          }
        }
        if (values.vehicleBackImage) {
          const data = {
            file: values.vehicleBackImage,
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
          values.vehicleBackImage = result.secure_url;
        } else {
          if (isNotThirdparty) {
            setLoading(false);
            return setError('Vehicle Back Image is required');
          }
        }
        if (values.vehicleLeftImage) {
          const data = {
            file: values.vehicleLeftImage,
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
          values.vehicleLeftImage = result.secure_url;
        } else {
          if (isNotThirdparty) {
            setLoading(false);
            return setError('Vehicle Left Side Image is required');
          }
        }
        if (values.vehicleRightImage) {
          const data = {
            file: values.vehicleRightImage,
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
          values.vehicleRightImage = result.secure_url;
        } else {
          if (isNotThirdparty) {
            setLoading(false);
            return setError('Vehicle Right Side Image is required');
          }
        }
        if (values.vehicleLicence) {
          const data = {
            file: values.vehicleLicence,
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
          values.vehicleLicence = result.secure_url;
        } else {
          setLoading(false);
          return setError(
            'Vehicle Vehicle Licence/Proof of Ownership is required'
          );
        }
      }
      if (lifeTypes.includes(props.location.state.productType)) {
        if (!values.beneficiaries || !values.beneficiaries.length) {
          setLoading(false);
          return setError('At least one (1) beneficiary is required');
        }
      }
      props.history.push(`/kyc/${userId}`, {
        ...props.location.state,
        ...values,
        productType: quoteDetails.productType,
      });
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
        title='Extra Data'
        instruction='Please fill required fields to proceed'
        data={[
          ...pickExtraData(quoteDetails.productType, (val) => setError(val)),
        ]}
        action={(values) => {
          submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default ExtraDataPage;
