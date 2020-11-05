// import "date-fns";
import 'moment';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import logo from '../../assets/logo.png';
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
  Button,
  Card,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
// import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
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
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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

const FormBuilder = ({
  data,
  action,
  title,
  instruction,
  loading,
  error,
  defaultValues,
}) => {
  const [state, setState] = useState({});
  const [templateData, setTemplateData] = useState({});
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
    exactDependentValue,
    greaterType,
    keyState
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
        if (
          dependentState &&
          ((!greaterType && dependentState === exactDependentValue) ||
            (greaterType && dependentState >= exactDependentValue))
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
      if (
        type === 'number' ||
        type === 'currency' ||
        type === 'bvn' ||
        type === 'number2'
      ) {
        if ('required' in obj && !current) {
          return obj['required'];
        }
        if (!obj['required'] && !`${current}`.length) {
          return null;
        }
        if ('min' in obj && Number(current) < obj.min[0] && !keyState) {
          return obj.min[1];
        }
        if (
          'max' in obj &&
          Number(current) > obj.max[0] &&
          !keyState &&
          obj.max[2]
        ) {
          return obj.max[1];
        }
        if ('minLength' in obj && `${current}`.length < obj.minLength[0]) {
          return obj.minLength[1];
        }
        if ('maxLength' in obj && `${current}`.length > obj.maxLength[0]) {
          return obj.maxLength[1];
        }
      }
    }
    return null;
  };
  useEffect(() => {
    if (defaultValues && Object.keys(defaultValues).length) {
      setState(defaultValues);
    }
  }, [defaultValues]);
  useEffect(() => {
    const newError = {};

    data.forEach((dt) => {
      if (dt.keyState) {
        console.log(state[dt.keyState.key], dt.keyState.key);
      }
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
            : dt.dependent.gtValue
            ? dt.dependent.gtValue
            : dt.dependent.value
          : null,
        dt.dependent
          ? typeof dt.dependent === 'string'
            ? null
            : dt.dependent.gtValue
            ? true
            : false
          : null,
        dt.keyState ? state[dt.keyState.key] === dt.keyState.value : false
      );
      if (rtErr) {
        newError[dt.name] = rtErr;
      }
    });
    console.log(newError, state);
    setErrorState(newError);
  }, [state, data]);

  const chooseExtraInput = (type, name, obj, stateVal, setStateVal) => {
    switch (type) {
      case 'select':
        return (
          <FormControl
            key={name}
            className={classes.selectEmpty}
            // error={!!errorState[name]}
          >
            <InputLabel className={classes.label}>{obj.label}</InputLabel>
            <Select
              id={name}
              value={stateVal || ''}
              onChange={(e) => {
                const val = e.target.value;
                setStateVal(val);
              }}
              displayEmpty
              className={classes.textField}
              // inputProps={{ "aria-label": "Without label" }}
            >
              {obj.list && obj.list.length
                ? obj.list.map((li) => (
                    <MenuItem className={classes.items} key={li} value={li}>
                      {obj.currency ? `₦ ${li.toLocaleString()}` : li}
                    </MenuItem>
                  ))
                : null}
            </Select>
            {/* {errorState[name] && (
              <FormHelperText style={{ margin: 0 }}>
                {errorState[name]}
              </FormHelperText>
            )} */}
          </FormControl>
        );
      case 'number':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            // prefix={'₦'}
            // disabled={obj.disabled}
            // format={format || null}
            type='text'
            thousandSeparator={true}
            label={obj.label}
            value={stateVal}
            // error={!!errorState[name]}
            // helperText={errorState[name]}
            // onValueChange={({ value: v }) => {
            //   setState({ ...state, [name]: v });
            // }}
            onValueChange={({ value: val }) => {
              setStateVal(val);
            }}
          />
        );
      case 'phone':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            // prefix={'₦'}
            // disabled={obj.disabled}
            // format={format || null}
            type='text'
            format={'### #### #### ####'}
            // thousandSeparator={true}
            label={obj.label}
            value={stateVal}
            // error={!!errorState[name]}
            // helperText={errorState[name]}
            // onValueChange={({ value: v }) => {
            //   setState({ ...state, [name]: v });
            // }}
            onValueChange={({ value: val }) => {
              setStateVal(val);
            }}
          />
        );
      case 'date':
        return (
          <MuiPickersUtilsProvider utils={MomentUtils} key={name}>
            <div className={styles.date}>
              <DatePicker
                className={classes.textField}
                id={name}
                label={obj.label}
                value={stateVal || null}
                // error={!!errorState[name]}
                // helperText={errorState[name]}
                format='DD/MM/yyyy'
                placeholder='dd/mm/yyyy'
                onChange={(val) => {
                  setStateVal(val.toISOString(true).split('T')[0]);
                }}
                minDate={obj.minDate}
                maxDate={obj.maxDate}
                autoOk
              />
            </div>
          </MuiPickersUtilsProvider>
        );
      default:
        return (
          <TextField
            key={name}
            id={name}
            // type={type}
            disabled={obj.disabled}
            label={obj.label}
            value={stateVal}
            // error={!!errorState[name]}
            // helperText={errorState[name]}
            onChange={(e) => {
              const val = e.target.value;
              setStateVal(val);
            }}
          />
        );
    }
  };
  const chooseInput = (type, name, list, obj) => {
    switch (type) {
      case 'image':
        return (
          <div className='selector'>
            <input
              id={name}
              name={name}
              type='file'
              onChange={async (e) => {
                if (e.target.value) {
                  const base64 = await toBase64(e.target.files[0]);
                  setState({ ...state, [name]: base64 });
                } else {
                  setState({ ...state, [name]: null });
                }
              }}
            />
            <label htmlFor={name}>
              {state[name] ? (
                <img alt='preview' className='preview' src={state[name]} />
              ) : (
                <div>{`Choose ${obj.label.toLowerCase()}`}</div>
              )}
            </label>
          </div>
        );
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
      case 'multiadd':
        return (
          <div style={{ width: '100%' }}>
            <div>
              {state[name] &&
                state[name].length > 0 &&
                state[name].map((item, i) => (
                  <Card
                    key={i}
                    style={{
                      padding: '10px',
                      margin: '10px 0',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h2>
                      {item.firstname} {item.lastname} ({item.relationship})
                    </h2>
                    <p>{item.phone}</p>
                    <button
                      type='button'
                      className={styles.removeBtn}
                      onClick={() => {
                        const newState = [...(state[name] ? state[name] : [])];
                        newState.splice(i, 1);
                        console.log(newState);
                        setState({ ...state, [name]: newState });
                      }}
                    >
                      Remove
                    </button>
                  </Card>
                ))}
            </div>
            {obj.max && state[name] && state[name].length >= obj.max ? null : (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {obj.template.map(
                  (tm, i) =>
                    chooseExtraInput(
                      tm.type,
                      tm.name,
                      tm,
                      templateData[name] && templateData[name][tm.name]
                        ? templateData[name][tm.name]
                        : '',
                      (val) =>
                        setTemplateData({
                          ...templateData,
                          [name]: {
                            ...templateData[name],
                            [tm.name]: val,
                          },
                        })
                    )
                  // <TextField
                  //   key={i}
                  //   id={tm.name}
                  //   // type={type}
                  //   label={tm.label}
                  //   value={
                  //     templateData[name] && templateData[name][tm.name]
                  //       ? templateData[name][tm.name]
                  //       : ''
                  //   }
                  //   // error={!!errorState[name]}
                  //   // helperText={errorState[name]}
                  //   onChange={(e) =>
                  //     setTemplateData({
                  //       ...templateData,
                  //       [name]: {
                  //         ...templateData[name],
                  //         [tm.name]: e.target.value,
                  //       },
                  //     })
                  //   }
                  // />
                )}
                <Button
                  onClick={() => {
                    obj.setError(null);
                    if (
                      !templateData[name] ||
                      obj.template.map((t) => t.name).length >
                        Object.values(templateData[name]).filter(
                          (t) => t.length
                        ).length
                    ) {
                      return obj.setError('Fill all details');
                    }
                    setState({
                      ...state,
                      [name]: [
                        ...(state[name] && state[name].length
                          ? state[name]
                          : []),
                        templateData[name],
                      ],
                    });
                    setTemplateData({ ...templateData, [name]: {} });
                  }}
                  color='primary'
                  variant='contained'
                  style={{ alignSelf: 'flex-start', marginTop: '10px' }}
                >
                  Add
                </Button>
              </div>
            )}
          </div>
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
              disabled={obj.disabled}
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
              {obj.list
                ? obj.list.map((li) => (
                    <MenuItem className={classes.items} key={li} value={li}>
                      {obj.currency ? `₦ ${li.toLocaleString()}` : li}
                    </MenuItem>
                  ))
                : obj.dependent
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
              label={
                <>
                  {obj.label}
                  {`${obj.validate && obj.validate.required ? '*' : ''}`}
                </>
              }
            />
          </div>
        );
      case 'date':
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className={styles.date}>
              <DatePicker
                className={classes.textField}
                id={name}
                label={obj.label}
                value={state[name] || null}
                error={!!errorState[name]}
                helperText={errorState[name]}
                format='DD/MM/yyyy'
                placeholder='dd/mm/yyyy'
                onChange={(val) => {
                  console.log(val.toLocaleString());
                  setState({
                    ...state,
                    [name]: val.toISOString(true).split('T')[0],
                  });
                }}
                minDate={obj.minDate}
                maxDate={obj.maxDate}
                autoOk
                // clearable
              />
              {/* <TextField
              id={name}
              label={obj.label}
              className={classes.textField}
              type="date"
              value={state[name]}
              error={!!errorState[name]}
              helperText={errorState[name]}
              onChange={(e) => setState({ ...state, [name]: e.target.value })}
              inputProps={{ min: obj.minDate, max: obj.maxDate }}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            </div>
          </MuiPickersUtilsProvider>
        );
      case 'currency':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            prefix={'₦'}
            disabled={obj.disabled}
            type='text'
            thousandSeparator={true}
            label={obj.label}
            value={state[name]}
            error={!!errorState[name]}
            helperText={errorState[name]}
            onValueChange={({ value: val }) => {
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
          />
        );
      case 'number':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            // prefix={'₦'}
            disabled={obj.disabled}
            // format={format || null}
            type='text'
            thousandSeparator={true}
            label={obj.label}
            value={state[name]}
            error={!!errorState[name]}
            helperText={errorState[name]}
            onValueChange={({ value: val }) => {
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
          />
        );
      case 'bvn':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            // prefix={'₦'}
            disabled={obj.disabled}
            format={'### #### ####'}
            type='text'
            // thousandSeparator={true}
            label={obj.label}
            value={state[name]}
            error={!!errorState[name]}
            helperText={errorState[name]}
            onValueChange={({ value: val }) => {
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
          />
        );
      case 'number2':
        return (
          <NumberFormat
            id={name}
            name={name}
            customInput={TextField}
            // prefix={'₦'}
            disabled={obj.disabled}
            type='text'
            // thousandSeparator={true}
            label={obj.label}
            value={state[name]}
            error={!!errorState[name]}
            helperText={errorState[name]}
            onValueChange={({ value: val }) => {
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
              // onChange={(e) => setState({ ...state, [name]: e.target.value })}
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
            />
          </>
        );
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <img className={styles.logo} src={logo} alt='logo' />
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
        ) : datum.notShow ? (
          state[datum.notShow.key] !== datum.notShow.value ? (
            <div key={i} className={styles.inner}>
              {chooseInput(datum.type, datum.name, datum.list, datum)}
            </div>
          ) : null
        ) : (
          (!datum.dependent ||
            typeof datum.dependent === 'string' ||
            (datum.dependent &&
              datum.dependent.value &&
              state[datum.dependent.key] === datum.dependent.value) ||
            (datum.dependent &&
              datum.dependent.gtValue &&
              Number(state[datum.dependent.key]) >=
                datum.dependent.gtValue)) && (
            <div key={i} className={styles.inner}>
              {chooseInput(datum.type, datum.name, datum.list, datum)}
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
