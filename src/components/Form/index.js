// import "moment";
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo.jpeg';
import loader from '../../assets/loader.gif';
import isEmail from 'validator/es/lib/isEmail';
import NumberFormat from 'react-number-format';
import {
  TextField,
  Select as SelectParent,
  MenuItem,
  FormControlLabel,
  Checkbox as ParentCheckbox,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import MomentUtils from "@date-io/moment";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider,
// } from "@material-ui/pickers";
import styled from 'styled-components';
import {
  manufacturers,
  carModels,
  allStates,
  allLgas,
  allBanks,
} from './helpers';

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
    color: '#883395',
    marginBottom: '20px',
    '&$checked': {
      color: '#883395',
    },
  },
  checked: {},
})((props) => <ParentCheckbox color='default' {...props} />);

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  items: {
    textTransform: 'capitalize',
  },
  textField: {
    paddingTop: theme.spacing(2),
    marginBottom: 0,
  },
  label: { textTransform: 'capitalize' },
}));

const FormBuilder = ({ data, action, title, instruction, loading, error }) => {
  const [state, setState] = useState({});
  const [errorState, setErrorState] = useState({});
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(errorState).length) return action(state);
  };

  const validateInput = (
    type,
    obj,
    current,
    dependent,
    dependentState,
    exactDependentValue
  ) => {
    if (dependent) {
      if (typeof dependent === 'string') {
        if (dependentState) {
          if ('required' in obj && !current) {
            return obj['required'];
          }
          if ('min' in obj && current.length < obj.min[0]) {
            return obj.min[1];
          }
          if ('max' in obj && current.length > obj.max[0]) {
            return obj.max[1];
          }
          if ('email' in obj && !isEmail(current)) {
            return obj.email;
          }
        }
      } else {
        if (dependentState && dependentState === exactDependentValue) {
          if ('required' in obj && !current) {
            return obj['required'];
          }
          if ('min' in obj && current.length < obj.min[0]) {
            return obj.min[1];
          }
          if ('max' in obj && current.length > obj.max[0]) {
            return obj.max[1];
          }
          if ('email' in obj && !isEmail(current)) {
            return obj.email;
          }
        }
      }
    } else {
      if (
        type === 'text' ||
        type === 'select' ||
        type === 'date' ||
        type === 'email' ||
        type === 'textarea' ||
        type === 'checkbox'
      ) {
        if ('required' in obj && !current) {
          return obj['required'];
        }
        if ('min' in obj && current.length < obj.min[0]) {
          return obj.min[1];
        }
        if ('max' in obj && current.length > obj.max[0]) {
          return obj.max[1];
        }
        if ('email' in obj && !isEmail(current)) {
          return obj.email;
        }
      }
      if (type === 'number' || type === 'currency') {
        if ('required' in obj && !current) {
          return obj['required'];
        }
        if ('min' in obj && current < obj.min[0]) {
          return obj.min[1];
        }
        if ('max' in obj && current > obj.max[0]) {
          return obj.max[1];
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const newError = {};

    data.forEach((dt) => {
      const rtErr = validateInput(
        dt.type,
        dt.validate,
        state[dt.name],
        dt.dependent,
        dt.dependent
          ? state[
              typeof dt.dependent === 'string' ? dt.dependent : dt.dependent.key
            ]
          : null,
        dt.dependent
          ? typeof dt.dependent === 'string'
            ? dt.dependent
            : dt.dependent.value
          : null
      );
      if (rtErr) {
        newError[dt.name] = rtErr;
      }
    });
    console.log(newError, state);
    setErrorState(newError);
  }, [state, data]);

  const chooseInput = (type, name, list, obj) => {
    switch (type) {
      case 'textarea':
        return (
          <>
            <TextField
              id={name}
              // type={type}
              label={obj.label}
              value={state[name]}
              error={!!errorState[name]}
              helperText={errorState[name]}
              onChange={(e) => setState({ ...state, [name]: e.target.value })}
              multiline
            />
            {/* <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label>
            <textarea id={name}value={state[name]}
            onChange={(e)=> setState({...state, [name]: e.target.value})} /> */}
          </>
        );

      case 'select':
        return (
          <FormControl
            className={classes.selectEmpty}
            error={!!errorState[name]}
          >
            <InputLabel className={classes.label}>
              {obj.label ? obj.label : `Select ${name}`}
            </InputLabel>
            <Select
              id={name}
              value={state[name] || ''}
              onChange={(e) => {
                const val = e.target.value;
                if (obj.action) {
                  obj.action(val, (...args) => {
                    const newObj = {
                      [name]: val,
                    };
                    obj.setterKeys.forEach((st, i) => {
                      newObj[st] = args[i];
                    });

                    return setState({
                      ...state,
                      ...newObj,
                    });
                  });
                } else {
                  setState({ ...state, [name]: val });
                }
              }}
              displayEmpty
              className={classes.textField}
              // inputProps={{ "aria-label": "Without label" }}
            >
              {obj.dependent
                ? state[obj.dependent]
                  ? dataBucket[obj.data][state[obj.dependent]] &&
                    dataBucket[obj.data][state[obj.dependent]].map((li) => (
                      <MenuItem
                        className={classes.items}
                        key={li.value}
                        value={li.value}
                      >
                        {li.value}
                      </MenuItem>
                    ))
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
                      {obj.currency ? `₦ ${li.toLocaleString()}` : li}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {errorState[name] && (
              <FormHelperText style={{ margin: 0 }}>
                {errorState[name]}
              </FormHelperText>
            )}
          </FormControl>
        );

      case 'checkbox':
        return (
          <div className={styles.checker}>
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  color='primary'
                  value={state[name]}
                  error={!!errorState[name]}
                  helperText={errorState[name]}
                  onChange={(e) =>
                    setState({ ...state, [name]: e.target.checked })
                  }
                />
              }
              label={`${obj.label}${
                obj.validate && obj.validate.required ? '*' : ''
              }`}
            />
            {/* <input id={name} type={type}value={state[name]}
            onChange={(e)=> setState({...state, [name]: e.target.value})} />
            <label htmlFor={name}>
              {obj.label}
              {obj.validate && obj.validate.required ? "*" : ""}
            </label> */}
          </div>
        );
      case 'date':
        return (
          <div className={styles.date}>
            <TextField
              id={name}
              label={obj.label}
              className={classes.textField}
              type='date'
              value={state[name]}
              error={!!errorState[name]}
              helperText={errorState[name]}
              onChange={(e) => setState({ ...state, [name]: e.target.value })}
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
               value={state[name]}
               onChange={(e)=> setState({...state, [name]: e.target.value})}
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
             value={state[name]}
             onChange={(e)=> setState({...state, [name]: e.target.value})}
            /> */}
          </div>
        );
      case 'currency':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            prefix={'₦'}
            disabled={obj.disabled}
            // format={format || null}
            type='text'
            thousandSeparator={true}
            label={obj.label}
            value={state[name]}
            error={!!errorState[name]}
            helperText={errorState[name]}
            onValueChange={({ value: v }) => {
              setState({ ...state, [name]: v });
            }}
          />
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
              disabled={obj.disabled}
              label={obj.label}
              value={state[name]}
              error={!!errorState[name]}
              helperText={errorState[name]}
              onChange={(e) => setState({ ...state, [name]: e.target.value })}
            />
          </>
        );
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img src={logo} alt='logo' />
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
              state[datum.dependent.key] === datum.dependent.value)) && (
            <div key={i} className={styles.inner}>
              {chooseInput(datum.type, datum.name, datum.list, datum)}
              {/* {formik.touched[datum.name] && formik.errors[datum.name] ? (
                <span>{formik.errors[datum.name]}</span>
              ) : null} */}
            </div>
          )
        )
      )}

      {loading ? (
        <img src={loader} alt='loader' />
      ) : (
        <button
          className={styles.button}
          disabled={Object.keys(errorState).length}
          type='submit'
        >
          &#8594;
        </button>
      )}
    </form>
  );
};

export default FormBuilder;
