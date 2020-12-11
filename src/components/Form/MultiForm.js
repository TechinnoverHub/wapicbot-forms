import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import NumberFormat from "react-number-format";
import loader from "../../assets/loader.gif";

import {
  TextField,
  Select as SelectParent,
  MenuItem,
  //   FormControlLabel,
  //   Checkbox as ParentCheckbox,
  Button,
  Card,
  FormControl,
  InputLabel,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import FileBase64 from "react-file-base64";

import styled from "styled-components";

const Select = styled(SelectParent)`
  .MuiSelect-select {
    background-color: transparent;
    text-transform: capitalize;
    &:focus {
      background-color: transparent;
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(4),
    width: "100%",
  },
  formControl: {
    width: "100%",
  },
  items: {
    textTransform: "capitalize",
  },
  textField: {
    paddingTop: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(2),
  },
  label: {
    marginBottom: theme.spacing(2),
  },
}));

const testData = [
  "air conditioner",
  "television",
  "refrigerator",
  "freezer",
  "home theater/ sound system",
  "table",
  "gas cooker",
  "shoes",
  "bags",
  "inverter",
  "clothing",
  "bed & beddings",
  "water dispenser",
  "standing fan",
  "washing machine",
  "living room settee",
  "laptop",
  "phone",
  "jewelries",
  "wristwatches",
  "camera",
  "others (movable items)",
  "others (non-movable items)",
  "kitchen cabinet",
];

const MultiForm = ({
  template,
  selectData = testData,
  action,
  title,
  instruction,
  loading,
  error,
}) => {
  const classes = useStyles();
  const [state, setState] = useState([{ ...template }]);
  const [errorState, setErrorState] = useState({});

  useEffect(() => {
    const newError = {};
    state.forEach((st, i) => {
      if (!st.name) {
        newError[`name${i}`] = "is Required";
      }
      if (!st.value) {
        newError[`value${i}`] = "is Required";
      }
      if (!st.image) {
        newError[`image${i}`] = 'is Required';
      }
    });
    setErrorState(newError);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errorState).length) return action(state);
  };
  const handleChange = (key, i, val) => {
    const newState = [...state];
    newState[i][key] = val;
    setState(newState);
  };

  const addMore = () => {
    console.log(template);
    setState([...state, { ...template }]);
  };
  const removeOne = (i) => {
    const newState = [...state];
    console.log(i, newState);
    newState.splice(i, 1);

    setState(newState);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <img src={logo} alt="logo" />
      <h2>{title}</h2>

      {instruction && <p>{instruction}</p>}

      {error && (
        <div className={styles.errorBox}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {state.map((st, i) => (
        <Card className={classes.card}>
          <FormControl
            className={classes.formControl}
<<<<<<< HEAD
            error={errorState[`name${i}`]}
          >
            <InputLabel id="demo-simple-select-label" className={classes.label}>
=======
            error={errorState[`name${i}`]}>
            <InputLabel id='demo-simple-select-label' className={classes.label}>
>>>>>>> b0af565997a281ea3b89152b852575cff66ce43f
              Item to cover
            </InputLabel>
            <Select
              id={i}
              value={st.name}
              onChange={(data) => handleChange("name", i, data.target.value)}
              //   {...formik.getFieldProps(name)}
              displayEmpty
              className={classes.selectEmpty}
<<<<<<< HEAD
              inputProps={{ "aria-label": "Without label" }}
            >
=======
              inputProps={{ 'aria-label': 'Without label' }}>
>>>>>>> b0af565997a281ea3b89152b852575cff66ce43f
              {/* <MenuItem className={classes.items} value="" disabled>
                Select One
              </MenuItem> */}

              {selectData.map((li) => (
                <MenuItem className={classes.items} key={li} value={li}>
                  {li}
                </MenuItem>
              ))}
            </Select>
            {errorState[`name${i}`] && (
              <FormHelperText style={{ margin: 0 }}>
                {errorState[`name${i}`]}
              </FormHelperText>
            )}
          </FormControl>

          <NumberFormat
            id={i}
            className={classes.selectEmpty}
            label={"Value"}
            error={errorState[`value${i}`]}
            helperText={errorState[`value${i}`]}
            value={st.value}
            name={"value" + i}
            customInput={TextField}
            prefix={"₦"}
            // format={format || null}
            type="text"
            thousandSeparator={true}
            onValueChange={({ value: v }) => handleChange("value", i, v)}
          />
          <div style={{ marginTop: "10px" }}>
            <FileBase64
              disabled={loading}
              onDone={(file) => handleChange("image", i, file.base64)}
            />
            {errorState[`name${i}`] && (
              <FormHelperText error>{errorState[`image${i}`]}</FormHelperText>
            )}
          </div>
          {i > 0 && (
            <IconButton
              onClick={() => removeOne(i)}
<<<<<<< HEAD
              aria-label="delete"
              className={classes.btn}
            >
              <DeleteIcon fontSize="small" color="secondary" />
=======
              aria-label='delete'
              className={classes.btn}>
              <DeleteIcon fontSize='small' color='secondary' />
>>>>>>> b0af565997a281ea3b89152b852575cff66ce43f
            </IconButton>
          )}
        </Card>
      ))}
      <div>
        <Button
          onClick={addMore}
<<<<<<< HEAD
          variant="contained"
          size="small"
          className={classes.items}
        >
=======
          variant='contained'
          size='small'
          className={classes.items}>
>>>>>>> b0af565997a281ea3b89152b852575cff66ce43f
          add
        </Button>
      </div>

      {loading ? (
        <img src={loader} alt="loader" />
      ) : (
        <button
          disabled={Object.keys(errorState).length}
          className={styles.button}
<<<<<<< HEAD
          type="submit"
        >
=======
          type='submit'>
>>>>>>> b0af565997a281ea3b89152b852575cff66ce43f
          &#8594;
        </button>
      )}
    </form>
  );
};

export default MultiForm;
