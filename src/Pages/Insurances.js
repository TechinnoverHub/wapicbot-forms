import React, { useState, useContext } from "react";
import FormBuilder from "../components/Form";
import MultiForm from "../components/Form/MultiForm";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
// import includesAll from '../utils/includesAll';
import axios from "axios";
import { PolicyIDContext } from "../context/policyPurchased";

const isDev = process.env.NODE_ENV === "development";
// import cloudinary from 'cloudinary/lib/cloudinary';
const CLOUDINARY_URL = `http${isDev ? "" : "s"}://api.cloudinary.com/v1_1/${
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
const productmap = {
  "moov-third-party": "Motor Insurance (3rd Party)",
  "moov-plus-(fire-and-theft)": "Motor Insurance (Third Party Fire & Theft)",
  "moov-luxury-(extented-comprehensive)":
    "Motor Insurance Luxury (Comprehensive)",
  "moov-prestige-(private-comprehensive)":
    "Comprehensive Vehicle Insurance (Private Motor)",
  "commercial-vehicle-(comprehensive)":
    "Comprehensive Vehicle Insurance (Commercial Motor)",
  "house-holders-insurance": "House Holders Insurance",
  "house-owners-insurance": "House Owners Insurance",
  "e-term": "E-Term",
  "smart-scholars-plan": "Smart Scholars Plan",
  "smart-life": "Smart Life",
  "smart-life-plus": "Smart Life Plus",
  "smart-senior-plan": "Smart Senior Plan",
};
const vehicleClassMap = {
  "private Cars": "PRIVATE",
  "Commercial Buses & Vehicle": "COMMERCIAL",
  "commercial Buses & Vehicle": "BUSES",
  "trucks & General Cartage": "TRUCKS",
  uber: "UBER",
  "motor cycle": "MOTORCYCLE",
};
const houseTypes = ["house-holders-insurance", "house-owners-insurance"];
const lifeTypes = [
  "e-term",
  "smart-scholars-plan",
  "smart-life",
  "smart-life-plus",
  "smart-senior-plan",
];
const vehicleType = [
  "moov-third-party",
  "moov-plus-(fire-and-theft)",
  "moov-luxury-(extented-comprehensive)",
  "moov-prestige-(private-comprehensive)",
  "commercial-vehicle-(comprehensive)",
];
const vehicleTypeDefault = [
  "moov-plus-(fire-and-theft)",
  "moov-luxury-(extented-comprehensive)",
  "moov-prestige-(private-comprehensive)",
];

const lifeinsurance = [
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    validate: {
      required: "required",
    },
    type: "text",
  },

  // {
  //   name: 'phone',
  //   label: 'Phone',
  //   validate: {
  //     required: 'required',
  //     min: [11, 'Must be 11 characters or more'],
  //     max: [11, 'Must be 11 characters or more'],
  //   },
  //   type: 'text',
  // },
  {
    name: "age",
    label: "Age",
    validate: {
      required: "required",
    },

    type: "select",
    list: [...new Array(45)].map((num, i) => i + 18),
  },
  // {
  //   name: 'dateOfBirth',
  //   label: 'Date of Birth',
  //   minDate: `${new Date().getFullYear() - 60}-01-01`,
  //   maxDate: `${new Date().getFullYear() - 18}-12-31`,
  //   validate: {
  //     required: 'required',
  //   },
  //   type: 'date',
  // },
  // {
  //   name: 'sumAssured',
  //   label: 'Sum Assured',
  //   validate: {
  //     required: 'required',
  //   },
  //   type: 'currency',
  // },
  {
    name: "duration",
    label: "Duration (in years)",
    validate: {
      required: "required",
      min: [3, "Must be at least 3 years"],
    },
    type: "number",
  },
  {
    name: "frequency",
    label: "Frequency",
    validate: {
      required: "required",
      // min: [3, 'Must be at least 3 years'],
    },
    type: "select",
    list: ["Monthly", "Quarterly", "Year", "Bi-Annual"],
  },
  {
    name: "annualPremium",
    label: "Annual Contribution",
    validate: {
      required: "required",
      min: [120000, "Must be at least ₦120,000"],
    },
    type: "currency",
  },
];
const smartLifeInsurance = [
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "age",
    label: "Age",
    validate: {
      required: "required",
    },

    type: "select",
    list: [...new Array(45)].map((num, i) => i + 18),
  },

  {
    name: "duration",
    label: "Duration (in years)",
    validate: {
      required: "required",
      min: [3, "Must be at least 3 years"],
    },
    type: "number",
  },
  {
    name: "frequency",
    label: "Frequency",
    validate: {
      required: "required",
      // min: [3, 'Must be at least 3 years'],
    },
    type: "select",
    list: ["Monthly", "Quarterly", "Year", "Bi-Annual"],
  },
  {
    name: "annualPremium",
    label: "Annual Contribution",
    validate: {
      required: "required",
      min: [120000, "Must be at least ₦120,000"],
    },
    type: "currency",
  },
];
const smartLifePlusInsurance = [
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    validate: {
      required: "required",
    },
    type: "text",
  },

  {
    name: "age",
    label: "Age",
    validate: {
      required: "required",
    },

    type: "select",
    list: [...new Array(37)].map((num, i) => i + 18),
  },

  {
    name: "duration",
    label: "Duration (in years)",
    validate: {
      required: "required",
      min: [3, "Must be at least 3 years"],
    },
    type: "number",
  },
  {
    name: "frequency",
    label: "Frequency",
    validate: {
      required: "required",
      // min: [3, 'Must be at least 3 years'],
    },
    type: "select",
    list: ["Monthly", "Quarterly", "Year", "Bi-Annual"],
  },
  {
    name: "annualPremium",
    label: "Annual Contribution",
    validate: {
      required: "required",
      min: [120000, "Must be at least ₦120,000"],
    },
    type: "currency",
  },
];
const smartScholarInsurance = [
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    validate: {
      required: "required",
    },
    type: "text",
  },

  {
    name: "age",
    label: "Age",
    validate: {
      required: "required",
    },

    type: "select",
    list: [...new Array(48)].map((num, i) => i + 18),
  },

  {
    name: "duration",
    label: "Duration (in years)",
    validate: {
      required: "required",
      min: [5, "Must be at least 5 years"],
    },
    type: "number",
  },
  {
    name: "frequency",
    label: "Frequency",
    validate: {
      required: "required",
      // min: [3, 'Must be at least 3 years'],
    },
    type: "select",
    list: ["Monthly", "Quarterly", "Year", "Bi-Annual"],
  },
  {
    name: "annualPremium",
    label: "Annual Contribution",
    validate: {
      required: "required",
      min: [60000, "Must be at least ₦60,000"],
    },
    type: "currency",
  },
];

const eTermInsurance = [
  {
    name: "firstName",
    label: "First Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    validate: {
      required: "required",
    },
    type: "text",
  },
  {
    name: "age",
    label: "Age",
    validate: {
      required: "required",
    },

    type: "select",
    list: [...new Array(43)].map((num, i) => i + 18),
  },
  {
    name: "annualPremium",
    label: "Annual Premium",
    validate: {
      required: "required",
    },
    type: "select",
    setterKeys: ["sumAssured", "medicalBenefit"],
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
    name: "sumAssured",
    label: "Sum Assured",
    validate: {
      required: "required",
    },
    type: "select",
    setterKeys: ["annualPremium", "medicalBenefit"],
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
    name: "medicalBenefit",
    label: "Medical Benefit",
    validate: {
      required: "required",
    },
    disabled: true,
    type: "currency",
  },
  {
    name: "duration",
    label: "Duration (in years)",
    validate: {
      required: "required",
    },
    type: "number",
  },
];
const houseOwnersInsurance = [
  // {
  //   name: "firstName",
  //   label: "First Name",
  //   validate: {
  //     required: "required",
  //   },
  //   type: "text",
  // },
  // {
  //   name: "lastName",
  //   label: "Last Name",
  //   validate: {
  //     required: "required",
  //   },
  //   type: "text",
  // },
  // {
  //   name: "age",
  //   label: "Age",
  //   validate: {
  //     required: "required",
  //   },

  //   type: "select",
  //   list: [...new Array(43)].map((num, i) => i + 18),
  // },
  // {
  //   name: "annualPremium",
  //   label: "Annual Premium",
  //   validate: {
  //     required: "required",
  //   },
  //   type: "select",
  //   setterKeys: ["sumAssured", "medicalBenefit"],
  //   currency: true,
  //   action: (val, setter) => {
  //     setter(val * 100, medicalBenefitMap[val]);
  //   },
  //   list: [
  //     ...[...new Array(10)].map((num, i) => (i + 1) * 1000),
  //     20000,
  //     50000,
  //     75000,
  //     100000,
  //   ],
  // },
  // {
  //   name: "sumAssured",
  //   label: "Sum Assured",
  //   validate: {
  //     required: "required",
  //   },
  //   type: "select",
  //   setterKeys: ["annualPremium", "medicalBenefit"],
  //   action: (val, setter) => {
  //     setter(val / 100, medicalBenefitMap[val / 100]);
  //   },
  //   list: [
  //     ...[...new Array(10)].map((num, i) => (i + 1) * 100000),
  //     2000000,
  //     5000000,
  //     7500000,
  //     10000000,
  //   ],
  //   currency: true,
  // },
  // {
  //   name: "medicalBenefit",
  //   label: "Medical Benefit",
  //   validate: {
  //     required: "required",
  //   },
  //   disabled: true,
  //   type: "currency",
  // },
  // {
  //   name: "duration",
  //   label: "Duration (in years)",
  //   validate: {
  //     required: "required",
  //   },
  //   type: "number",
  // },
];

const products = {
  "moov-third-party": [
    {
      name: "vehicleClass",
      label: "Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: [
        "private Cars",
        "Commercial Buses & Vehicle",
        "trucks & General Cartage",
      ],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },

    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
        min: [1000000, "Must be at least ₦1,000,000"],
      },
      type: "currency",
      setterKeys: ["tracking"],
      action: (val, setter) => {
        console.log(val);
        if (Number(val) >= 5000000) {
          console.log("set", val);
          setter("yes");
        } else {
          setter(null);
        }
      },
    },

    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
    {
      name: "tracking",
      label: "Vehicle Tracker",
      validate: {
        // required: "required",
      },
      type: "text",
      disabled: true,
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
  ],
  "moov-plus-(fire-and-theft)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      disabled: true,
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    // {
    //   name: "policyholder",
    //   label: "Vehicle Type",
    //   validate: {
    //     required: "required",
    //   },
    //   selectLabel: "select one",
    //   type: "select",
    //   list: ["Corporate Use", "Private Use"],
    // },

    // {
    //   name: "phone",
    //   label: "Phone Number",
    //   validate: {
    //     required: "required",
    //     max: [11, "Must be 11 characters"],
    //     min: [11, "Must be 11 characters"],
    //   },
    //   type: "text",
    // },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
        min: [1000000, "Must be at least ₦1,000,000"],
      },
      type: "currency",
      setterKeys: ["tracking"],
      action: (val, setter) => {
        console.log(val);
        if (Number(val) >= 5000000) {
          console.log("set", val);
          setter("yes");
        } else {
          setter(null);
        }
      },
    },
    {
      name: "floodExt",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
    {
      name: "riot",
      label: "Riot strike and civil commotion cover",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "tracking",
      label: "Vehicle Tracker",
      validate: {
        // required: "required",
      },
      type: "text",
      disabled: true,
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
  ],
  "moov-luxury-(extented-comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      disabled: true,
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    // {
    //   name: "policyholder",
    //   label: "Vehicle Type",
    //   validate: {
    //     required: "required",
    //   },
    //   selectLabel: "select one",
    //   type: "select",
    //   list: ["Corporate Use", "Private Use"],
    // },

    // {
    //   name: "phone",
    //   label: "Phone Number",
    //   validate: {
    //     required: "required",
    //     max: [11, "Must be 11 characters"],
    //     min: [11, "Must be 11 characters"],
    //   },
    //   type: "text",
    // },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
        min: [1000000, "Must be at least ₦1,000,000"],
      },
      type: "currency",
      setterKeys: ["tracking"],
      action: (val, setter) => {
        console.log(val);
        if (Number(val) >= 5000000) {
          console.log("set", val);
          setter("yes");
        } else {
          setter(null);
        }
      },
    },
    {
      name: "floodExt",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
    {
      name: "riot",
      label: "Riot strike and civil commotion cover",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "tracking",
      label: "Vehicle Tracker",
      validate: {
        // required: "required",
      },
      type: "text",
      disabled: true,
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
  ],
  "moov-prestige-(private-comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      disabled: true,
      list: ["private Cars"],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
    },
    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    // {
    //   name: "policyholder",
    //   label: "Vehicle Type",
    //   validate: {
    //     required: "required",
    //   },
    //   selectLabel: "select one",
    //   type: "select",
    //   list: ["Corporate Use", "Private Use"],
    // },

    // {
    //   name: "phone",
    //   label: "Phone Number",
    //   validate: {
    //     required: "required",
    //     max: [11, "Must be 11 characters"],
    //     min: [11, "Must be 11 characters"],
    //   },
    //   type: "text",
    // },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
        min: [1000000, "Must be at least ₦1,000,000"],
      },
      type: "currency",
      setterKeys: ["tracking"],
      action: (val, setter) => {
        console.log(val);
        if (Number(val) >= 5000000) {
          console.log("set", val);
          setter("yes");
        } else {
          setter(null);
        }
      },
    },
    {
      name: "floodExt",
      label: "Flood Extension",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "riot",
      label: "Riot strike and civil commotion cover",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
    {
      name: "tracking",
      label: "Vehicle Tracker",
      validate: {
        // required: "required",
      },
      type: "text",
      disabled: true,
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
  ],
  "commercial-vehicle-(comprehensive)": [
    {
      name: "vehicleClass",
      label: "Select Vehicle Class",
      validate: {
        required: "required",
      },
      type: "select",
      list: [
        "commercial Buses & Vehicle",
        "trucks & General Cartage",
        "uber",
        "motor cycle",
      ],
    },
    {
      name: "manufacturer",
      data: "manufacturers",
      label: "select Manufacturer ",
      validate: {
        required: "required",
      },
      type: "select",
      notShow: {
        key: "vehicleClass",
        value: "motor cycle",
      },
    },
    {
      name: "model",
      label: "Select Vehicle Model",
      validate: {
        required: "required",
      },
      type: "select",
      dependent: "manufacturer",
      data: "carModels",
      notShow: {
        key: "vehicleClass",
        value: "motor cycle",
      },
    },
    {
      name: "manufacturer",
      label: "Enter Manufacturer ",
      validate: {
        required: "required",
      },
      type: "text",
      dependent: {
        key: "vehicleClass",
        value: "motor cycle",
      },
    },
    {
      name: "model",
      label: "Enter Vehicle Model",
      validate: {
        required: "required",
      },
      type: "text",
      dependent: {
        key: "vehicleClass",
        value: "motor cycle",
      },
    },

    {
      name: "regNumber",
      label: "Registration Number",
      validate: {
        required: "required",
      },
      type: "text",
    },
    // {
    //   name: "policyholder",
    //   label: "Vehicle Type",
    //   validate: {
    //     required: "required",
    //   },
    //   selectLabel: "select one",
    //   type: "select",
    //   list: ["Commercial Use", "Private Use"],
    // },

    // {
    //   name: "phone",
    //   label: "Phone Number",
    //   validate: {
    //     required: "required",
    //     max: [11, "Must be 11 characters"],
    //     min: [11, "Must be 11 characters"],
    //   },
    //   type: "text",
    // },
    {
      name: "vehicleValue",
      label: "Vehicle value",
      validate: {
        required: "required",
        min: [1000000, "Must be at least ₦1,000,000", true],
      },
      type: "currency",
      setterKeys: ["tracking"],
      keyState: { key: "vehicleClass", value: "motor cycle" },
      action: (val, setter, keyState) => {
        console.log(val);
        if (Number(val) >= 5000000 && !keyState) {
          console.log("set", val);
          setter("yes");
        } else {
          setter(null);
        }
      },
    },
    {
      name: "riot",
      label: "Riot strike and civil commotion cover",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
    },
    {
      name: "excessBuyBack",
      label: "Excess Buy Back",
      validate: {
        required: "required",
      },
      type: "select",
      list: ["yes", "no"],
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
    {
      name: "tracking",
      label: "Vehicle Tracker",
      validate: {
        // required: "required",
      },
      type: "text",
      disabled: true,
      dependent: {
        key: "vehicleValue",
        gtValue: 5000000,
      },
    },
  ],
  "e-term": eTermInsurance,
  "smart-scholars-plan": smartScholarInsurance,
  "smart-life": smartLifeInsurance,
  "smart-life-plus": smartLifePlusInsurance,
  "smart-senior-plan": lifeinsurance,
  "house-owners-insurance": houseOwnersInsurance,
};
const Insurances = ({ history, location }) => {
  const [loading, setLoading] = useState(false);
  // const [defaultValues, setDefaultValues] = useState({});
  const [, setPayloadContext] = useContext(PolicyIDContext)

  const [error, setError] = useState(null);

  const { type, userId } = useParams();

  // useEffect(() => {
  //   const states = Object.keys(location.state || {});
  //   if (vehicleType.includes(type)) {
  //     const isValid = includesAll(states, ['manufacturer', 'model']);

  //     if (!isValid) {
  //       return history.push(`/check-vehicle/${type}/${userId}`);
  //     }
  //     setDefaultValues({
  //       manufacturer: location.state.manufacturer,
  //       model: location.state.model,
  //     });
  //   }
  // }, [history, location.state, type, userId]);
  return (
    <Container>
      {houseTypes.includes(type) && (
        <MultiForm
          title={productmap[type]}
          data={products[type] || []}
          instruction="Fill Details"
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
                      upload_preset: "pb9zgwxy",
                    };
                    const r = await fetch(CLOUDINARY_URL, {
                      body: JSON.stringify(data),
                      headers: {
                        "content-type": "application/json",
                      },
                      method: "POST",
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
              // console.log(valuesToUpload);

              const { data } = await axios.post(
                "https://wapicbot-api.herokuapp.com/api/products/get-quote",
                // "https://ec4174a4ecad.ngrok.io/api/products/get-quote",
                {
                  items: valuesToUpload,
                  productCode: type,
                  userId,
                }
              );
              setLoading(false);
              setPayloadContext(data.data?.policyPurchasedId)
              history.push(`/quote-success/${userId}`, {
                productType: type,
                quote: data.data.quote,
              });
            } catch (error) {
              setLoading(false);
              if (error.response) {
                setError(error.response.data.message);
              }
              console.log(error.response, error, "errores");
            }
          }}
          template={{
            name: "",
            value: null,
          }}
        />
      )}
      {vehicleType.includes(type) && (
        <FormBuilder
          error={error}
          loading={loading}
          title={productmap[type]}
          defaultValues={
            vehicleTypeDefault.includes(type)
              ? { vehicleClass: "private Cars" }
              : {}
          }
          instruction="Fill Details"
          data={products[type] || []}
          action={async (values) => {
            setLoading(true);
            setError(null);
            console.log(values);
            try {
              const { data } = await axios.post(
                "https://wapicbot-api.herokuapp.com/api/products/get-quote",
                // "https://940dde6e0c61.ngrok.io/api/products/get-quote",
                {
                  vehicleClass: vehicleClassMap[values.vehicleClass],
                  regNumber: values.regNumber,
                  type: values.policyholder,
                  make: values.manufacturer,
                  model: values.model,
                  worth: values.vehicleValue,
                  productCode: type,
                  floodExt: values.floodExt,
                  riot: values.riot,
                  tracking: values.tracking,
                  excessBuyBack: values.excessBuyBack,
                  userId,
                }
              );
              setPayloadContext(data.data?.policyPurchasedId)
              setLoading(false);
              history.push(`/quote-success/${userId}`, {
                ...values,
                regNumber: values.regNumber,
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
          title={productmap[type]}
          instruction="Fill Details"
          data={products[type] || []}
          action={async (values) => {
            setLoading(true);
            setError(null);
            console.log(values);
            const frequencyMap = {
              Year: "Y",
              "Bi-Annual": "H",
              Monthly: "M",
              Quarterly: "Q",
            };
            try {
              const { data } = await axios.post(
                "https://wapicbot-api.herokuapp.com/api/products/get-quote",
                // 'https://2002004cab36.ngrok.io/api/products/get-quote',
                {
                  contribution: values.annualPremium,
                  pd: values.medicalBenefit,
                  demise: values.sumAssured,
                  frequency: frequencyMap[values.frequency],
                  duration: values.duration,
                  age: values.age,
                  productCode: type,
                  userId,
                  // idCard: values.idCard,
                  // passport: values.passport,
                  // beneficiaries: values.beneficiaries || [],
                }
              );
              setPayloadContext(data.data?.policyPurchasedId)
              setLoading(false);
              history.push(`/quote-success/${userId}`, {
                ...values,
                productType: type,
                ...([...lifeTypes.slice(1, lifeTypes.length)].includes(type)
                  ? {
                      quote: values.annualPremium,
                      expectedReturns: data.data.quote,
                    }
                  : {
                      quote: data.data.quote,
                    }),
              });
            } catch (error) {
              setLoading(false);
              if (error.response) {
                setError(error.response.data.message);
              }
              console.log(error.response, error);
            }
          }}
        />
      )}
    </Container>
  );
};

export default Insurances;
