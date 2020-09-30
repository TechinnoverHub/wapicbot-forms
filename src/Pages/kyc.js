import React, { useState, useEffect, useCallback } from 'react';
import FormBuilder from '../components/Form';
import Container from '../components/Container';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import loader from '../assets/loader.gif';
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
  'moov-prestige-(commercial-comprehensive)',
];
const lifeTypes = [
  'e-term',
  'smart-scholars-plan',
  'smart-life',
  'smart-senior-plan',
];

const KYC = (props) => {
  // const location = useLocation();
  const [quoteDetails, setQuoteDetails] = useState({});
  const [userDetails, setuserDetails] = useState({});
  const [defaultValues, setdefaultValues] = useState({});
  const { userId } = useParams();
  const [fetching, setFetching] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://wapicbot-api.herokuapp.com/api/users/${userId}`
      );
      console.log(data);

      setuserDetails({
        ...(data.data && data.data.email && { email: data.data.email }),
        ...(data.data &&
          data.data.whatsappNo && { whatsappNo: data.data.whatsappNo }),
        ...(data.data &&
          data.data.firstname && { firstname: data.data.firstname }),
      });

      data.data && data.data.kyc && setdefaultValues(data.data.kyc);
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  }, [userId]);

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
          'productType',
          'vinnumber',
          'engineNumber',
          'color',
          'yearOfModel',
          'regNumber',
          'vehicleImage',
        ]);

        console.log(isValid, props, states);
        if (!isValid) {
          window.location = 'https://wa.me/+2348111228899';
          return;
        }
        const {
          vehicleClass,
          manufacturer,
          model,
          policyholder,
          vehicleValue,
          product,
          quote,
          productType,
          vinnumber,
          engineNumber,
          color,
          regNumber,
          yearOfModel,
          floodExt,
          riot,
          tracking,
          vehicleImage,
        } = props.location.state;

        return setQuoteDetails({
          vehicleClass,
          manufacturer,
          model,
          policyholder,
          vehicleValue,
          product,
          quote,
          productType,
          vinnumber,
          engineNumber,
          color,
          yearOfModel,
          regNumber,
          floodExt: floodExt,
          riot: riot,
          tracking: tracking,
          vehicleImage,
        });
      }
      if (lifeTypes.includes(props.location.state.productType)) {
        const isValid = includesAll(states, [
          'product',
          'quote',
          'productType',
          'beneficiaries',
        ]);

        console.log(isValid, props, states);
        if (!isValid) {
          window.location = 'https://wa.me/+2348111228899';
          return;
        }
        const {
          product,
          quote,
          productType,
          beneficiaries,
        } = props.location.state;

        return setQuoteDetails({
          product,
          quote,
          productType,
          beneficiaries,
        });
      }

      const { productType, product, quote } = props.location.state;
      return setQuoteDetails({
        product,
        productType: productType,
        quote: quote,
      });
      // const isValid = includesAll(states, [
      //   "vehicleClass",
      //   "manufacturer",
      //   "model",
      //   "policyholder",
      //   "vehicleValue",
      //   "productType",
      //   "quote",
      // ]);

      // console.log(isValid, props, states);
      // if (!isValid) {
      //   return props.history.replace("/product/moov-third-party");
      // }
    } else {
      window.location = 'https://wa.me/+2348111228899';
    }
  }, [props]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const submitForm = async (values) => {
    setLoading(true);
    setError(null);
    try {
      if (values.passport && !values.passport.includes('https://')) {
        const data = {
          file: values.passport,
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
        values.passport = result.secure_url;
      }
      if (values.idCard && !values.idCard.includes('https://')) {
        const data = {
          file: values.idCard,
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
        values.idCard = result.secure_url;
      }
      // const searchParams = new URLSearchParams(location.search);
      // const whatsappNo = searchParams.get("whatsapp");/
      // if (!whatsappNo) setLoading(false);
      const { data } = await axios.post(
        'https://wapicbot-api.herokuapp.com/api/users/update-kyc',
        {
          kyc: {
            gender: values.gender,
            dob: values.dob,
            maritalStatus: values.maritalStatus,
            religion: values.religon,
            height: values.height,
            weight: values.weight,
            state: values.state,
            occupation: values.occupation,
            businessType: values.businessType,
            bankName: values.bankName,
            accountNumber: values.accountNumber,
            bvn: values.bvn,
            idCard: values.idCard,
            passport: values.passport,
          },
          userId,
          otherDetails: {
            yearOfModel: quoteDetails.yearOfModel,
            color: quoteDetails.color,
            engineNumber: quoteDetails.engineNumber,
            vinnumber: quoteDetails.vinnumber,
          },
        }
      );
      console.log(data);
      props.history.push(`/pay/${userId}`, {
        ...quoteDetails,
        ...userDetails,
        coverStartDate: values.coverStartDate,
      });
      // window.location = "https://wa.me/+2348111228899";
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
      {fetching ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <img src={loader} alt='loader' />
        </div>
      ) : (
        <FormBuilder
          error={error}
          loading={loading}
          defaultValues={defaultValues}
          title='KYC'
          instruction='Please fill required fields to proceed'
          data={[
            {
              section: 'Passport Photo',
            },
            {
              name: 'passport',
              label: 'Passport Photo',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
            {
              section: 'Indentification Card',
            },
            {
              name: 'idCard',
              label: 'Indentification Card',
              validate: {
                required: 'required',
              },
              type: 'image',
            },
            {
              section: 'Personal information',
            },
            {
              name: 'gender',
              label: 'Gender',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              list: ['MALE', 'FEMALE'],
            },

            {
              name: 'dob',
              label: 'Date of Birth',
              minDate: `${new Date().getFullYear() - 60}-01-01`,
              maxDate: `${new Date().getFullYear() - 18}-12-31`,
              validate: {
                required: 'required',
              },
              type: 'date',
            },
            {
              name: 'maritalStatus',
              label: 'Marital Status',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              list: ['DIVORCED', 'MARRIED', 'SINGLE', 'WIDOWED'],
            },
            {
              name: 'religion',
              label: 'Religion',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              list: [
                'BUDDISH',
                'CHINESE FOLK RELIGION',
                'CHRISTIANITY',
                'HINDUISM',
                'ISLAM',
                'NOT APPLICABLE',
                'OTHERS',
                'TRADITIONAL WORSHIPPER',
              ],
            },
            {
              name: 'height',
              label: 'Height (meters)',
              validate: {
                // required: "required",
                min: [1, 'Must be more than 1'],
              },
              type: 'number',
            },
            {
              name: 'weight',
              label: 'Weight (Kg)',
              validate: {
                // required: "required",
                min: [1, 'Must be more than 1'],
              },
              type: 'number',
            },
            {
              name: 'state',
              label: 'State',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              data: 'allStates',
            },
            {
              name: 'city',
              label: 'Select city',
              validate: {
                required: 'required',
              },
              type: 'select',
              dependent: 'state',
              data: 'allLgas',
            },

            {
              name: 'occupation',
              label: 'Occupation',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              list: [
                'accountant',
                'administrator',
                'architect',
                'banker',
                'beautician',
                'business trader',
                'caterer',
                'civil servant',
                'cleric',
                'communication technologies',
                'educationist',
                'engineer',
                'farmer',
                'fashion designer',
                'financial services consul',
                'horologist',
                'horticulturist',
                'importer and exporter',
                'information technologist',
                'journalist',
                'legal practitioner',
                'merchant',
                'military personnel',
                'not applicable',
                'NYSC member',
                'others',
                'pilot',
                'retired',
                'sailor',
                'scientist',
                'secretary',
                'student',
                'surveyor',
                'system analyst',
                'transporter',
              ],
            },
            {
              name: 'businessType',
              label: 'Business type',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              list: [
                'financial services',
                'manufacturing',
                'oil & gas',
                'others',
                'public sector',
                'retail customer',
                'services',
                'sme',
                'telecoms',
                'transportation',
              ],
            },
            {
              section: 'Cover & Bank Information',
            },

            {
              name: 'coverStartDate',
              label: 'Cover Start Date',
              minDate: `${new Date().getFullYear()}-${`${
                new Date().getMonth() + 1
              }`.padStart(2, 0)}-${new Date().getDate()}`,
              // maxDate: `${new Date().getFullYear()}-${
              //   new Date().getMonth() + 2
              // }-${new Date().getDate()}`,
              validate: {
                required: 'required',
              },
              type: 'date',
            },
            {
              name: 'bankName',
              label: 'Bank Name',
              validate: {
                required: 'required',
              },
              type: 'select',
              selectLabel: 'select one',
              data: 'allBanks',
              // list: ["access", "diamond", "zenith", "GTB"],
            },
            {
              name: 'accountNumber',
              label: 'Account Number',
              validate: {
                required: 'required',
                min: [10, 'Must be 10 characters or more'],
              },
              type: 'number',
            },
            {
              name: 'bvn',
              label: 'Bank Verification Number (optional)',
              validate: {
                // required: "required",
                min: [10, 'Must be 10 characters or more'],
              },
              type: 'number',
            },
          ]}
          action={(values) => {
            submitForm(values);
            //alert("submitted data \n" + JSON.stringify(values, null, 2));
          }}
        />
      )}
    </Container>
  );
};

export default KYC;
