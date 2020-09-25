import React, { useState, useEffect } from 'react';
import FormBuilder from '../components/Form';
import Container from '../components/Container';
import { useParams } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import includesAll from '../utils/includesAll';
// import formatNum from "../utils/formatNum";
const vehicleType = [
  'moov-third-party',
  'moov-plus-(fire-and-theft)',
  'moov-luxury-(extented-comprehensive)',
  'moov-prestige-(private-comprehensive)',
  'moov-prestige-(commercial-comprehensive)',
];
const lifeTypes = [
  'e-term',
  'smart-scholars-plan',
  'smart-life',
  'smart-senior-plan',
];
const pickExtraData = (type) => {
  const vehicleType = [
    'moov-third-party',
    'moov-plus-(fire-and-theft)',
    'moov-luxury-(extented-comprehensive)',
    'moov-prestige-(private-comprehensive)',
    'moov-prestige-(commercial-comprehensive)',
  ];
  if (vehicleType.includes(type)) {
    return [
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
        name: 'beneficiaries',
        label: 'beneficiaries',
        type: 'multiadd',
        max: 3,
        template: [
          { name: 'fullname', label: 'Full Name' },
          // { name: 'dob', label: 'Date of Birth'  },
          { name: 'age', label: 'Age' },
          { name: 'relationship', label: 'Relationship' },
          { name: 'phone', label: 'Phone Number' },
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
      // const searchParams = new URLSearchParams(location.search);
      // const whatsappNo = searchParams.get("whatsapp");/
      // if (!whatsappNo) setLoading(false);
      // const { data } = await axios.post(
      //   'https://wapicbot-api.herokuapp.com/api/users/update-kyc',
      //   {
      //     kyc: {
      //       gender: values.gender,
      //       dob: values.dateOfBirth,
      //       maritalStatus: values.maritalStatus,
      //       religion: values.religon,
      //       height: values.height,
      //       weight: values.weight,
      //       state: values.state,
      //       occupation: values.occupation,
      //       businessType: values.businessType,
      //       bankName: values.bankName,
      //       accountNumber: values.accountNumber,
      //       bvn: values.bvn,
      //     },
      //     userId,
      //     otherDetails: {
      //       yearOfModel: values.yearOfModel,
      //       color: values.color,
      //       engineNumber: values.engineNumber,
      //       vinnumber: values.vinnumber,
      //     },
      //   }
      // );
      // console.log(data);
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
        data={[...pickExtraData(quoteDetails.productType)]}
        action={(values) => {
          submitForm(values);
          //alert("submitted data \n" + JSON.stringify(values, null, 2));
        }}
      />
    </Container>
  );
};

export default ExtraDataPage;
