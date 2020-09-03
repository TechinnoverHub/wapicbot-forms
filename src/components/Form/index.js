// import "moment";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import logo from "../../assets/logo.jpeg";
import loader from "../../assets/loader.gif";
import {
  TextField,
  Select as SelectParent,
  MenuItem,
  FormControlLabel,
  Checkbox as ParentCheckbox,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import MomentUtils from "@date-io/moment";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
import styled from "styled-components";
import {
  manufacturers,
  carModels,
  allStates,
  allLgas,
  allBanks,
} from "./helpers";

const dataBucket = {
  manufacturers,
  carModels,
  allStates,
  allLgas,
  allBanks,
};
const Select = styled(SelectParent)`
  .MuiSelect-select {
    background-color: transparent;
    text-transform: capitalize;
    &:focus {
      background-color: transparent;
    }
  }
`;

const Checkbox = withStyles({
  root: {
    color: "#883395",
    marginBottom: "20px",
    "&$checked": {
      color: "#883395",
    },
  },
  checked: {},
})((props) => <ParentCheckbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(4),
  },
  items: {
    textTransform: "capitalize",
  },
  textField: {
    paddingTop: theme.spacing(2),
  },
}));

const FormBuilder = ({ data, action, title, instruction, loading, error }) => {
  const classes = useStyles();

  const addYupMethod = (obj, type, value) => {
    switch (type) {
      case "max":
        return obj.max(value[0], value[1]);
      case "min":
        return obj.min(value[0], value[1]);
      case "email":
        return obj.email(value);
      case "required":
        return obj.required(value);
      default:
        return obj;
    }
  };

  const createYupObject = (data, condition = false) => {
    const validation = {};
    const initials = {};
    data.forEach((dt) => {
      if (!dt.section) {
        if (
          !condition ||
          !dt.dependent ||
          (dt.dependent &&
            condition[dt.dependent.key] === dt.dependent.value) ||
          (dt.dependent && dt.data)
        ) {
          initials[dt.name] =
            dt.type === "date" ? new Date() : dt.type === "number" ? 0 : "";
          validation[dt.name] =
            dt.type !== "number" ? Yup.string() : Yup.number();
          Object.keys(dt.validate).forEach((ky) => {
            validation[dt.name] = addYupMethod(
              validation[dt.name],
              ky,
              dt.validate[ky]
            );
          });
        }
      }
    });
    return { validation, initials };
  };
  const useCreateFormik = (data, action) => {
    const { initials } = createYupObject(data);

    return useFormik({
      initialValues: initials,
      // validationSchema: Yup.object(validation),
      validate: async (values) => {
        const valuesToCheck = {};
        data.forEach((datum) => {
          (!datum.dependent ||
            (datum.dependent &&
              formik.values[datum.dependent.key] === datum.dependent.value)) &&
            (valuesToCheck[datum.name] = values[datum.name]);
        });
        const { validation } = createYupObject(data, values);
        const yupSchema = Yup.object(validation);
        const isValid = await yupSchema.isValid(valuesToCheck);
        if (!isValid) {
          return yupSchema.validate(valuesToCheck).catch(function (error) {
            return { [error.path]: error.message };
          });
        }
      },
      onSubmit: action,
    });
  };
  const formik = useCreateFormik(data, action);

  const chooseInput = (type, name, list, obj) => {
    switch (type) {
      case "textarea":
        return (
          <>
            <TextField
              id={name}
              // type={type}
              label={obj.label}
              {...formik.getFieldProps(name)}
              multiline
            />
            {/* <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label>
            <textarea id={name} {...formik.getFieldProps(name)} /> */}
          </>
        );

      case "select":
        return (
          <>
            {/* <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label> */}
            <Select
              id={name}
              {...formik.getFieldProps(name)}
              displayEmpty
              className={classes.selectEmpty}
              // inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem className={classes.items} value="" disabled>
                {obj.label ? obj.label : `select ${name}`}{" "}
              </MenuItem>

              {obj.dependent
                ? formik.values[obj.dependent]
                  ? dataBucket[obj.data][formik.values[obj.dependent]] &&
                    dataBucket[obj.data][formik.values[obj.dependent]].map(
                      (li) => (
                        <MenuItem
                          className={classes.items}
                          key={li.value}
                          value={li.value}
                        >
                          {li.value}
                        </MenuItem>
                      )
                    )
                  : null
                : obj.data
                ? dataBucket[obj.data].map((li) => (
                    <MenuItem
                      className={classes.items}
                      key={li.value}
                      value={li.value}
                    >
                      {li.value}
                    </MenuItem>
                  ))
                : list
                ? list.map((li) => (
                    <MenuItem className={classes.items} key={li} value={li}>
                      {li}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </>
        );

      case "checkbox":
        return (
          <div className={styles.checker}>
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  color="primary"
                  {...formik.getFieldProps(name)}
                />
              }
              label={`${obj.label}${
                obj.validate && obj.validate.required ? "*" : ""
              }`}
            />
            {/* <input id={name} type={type} {...formik.getFieldProps(name)} />
            <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label> */}
          </div>
        );
      case "date":
        return (
          <div className={styles.date}>
            <TextField
              id={name}
              label={obj.label}
              className={classes.textField}
              type="date"
              {...formik.getFieldProps(name)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="normal"
                id={name}
                label={obj.label}
                format="MM/dd/yyyy"
                {...formik.getFieldProps(name)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider> */}
            {/* <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label>
            <input
              id={name}
              type={type}
              placeholder={obj.label}
              {...formik.getFieldProps(name)}
            /> */}
          </div>
        );
      default:
        return (
          <>
            {/* <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label> */}
            <TextField
              id={name}
              // type={type}
              label={obj.label}
              {...formik.getFieldProps(name)}
            />
          </>
        );
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <img src={logo} alt="logo" />
      <h2>{title}</h2>

      {instruction && <p>{instruction}</p>}

      {error && (
        <div className={styles.errorBox}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {data.map((datum, i) =>
        datum.section ? (
          <h1 key={i} className={styles.section}>
            {datum.section}
          </h1>
        ) : (
          (!datum.dependent ||
            (datum.dependent &&
              formik.values[datum.dependent.key] ===
                datum.dependent.value)) && (
            <div
              key={i}
              className={`${styles.inner} ${
                formik.touched[datum.name] && formik.errors[datum.name]
                  ? styles.error
                  : ""
              }`}
            >
              {chooseInput(datum.type, datum.name, datum.list, datum)}
              {formik.touched[datum.name] && formik.errors[datum.name] ? (
                <span>{formik.errors[datum.name]}</span>
              ) : null}
            </div>
          )
        )
      )}

      {loading ? (
        <img src={loader} alt="loader" />
      ) : (
        <button
          disabled={
            Object.keys(formik.touched).length &&
            Object.keys(formik.errors).length
          }
          type="submit"
        >
          &#8594;
        </button>
      )}
    </form>
  );
};

export default FormBuilder;
