import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";

const FormBuilder = ({ data, action, title }) => {
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
  const useCreateFormik = (data, action) => {
    const initials = {};
    const validation = {};
    data.forEach((dt) => {
      initials[dt.name] = "";
      validation[dt.name] = dt.type !== "number" ? Yup.string() : Yup.number();
      Object.keys(dt.validate).forEach((ky) => {
        validation[dt.name] = addYupMethod(
          validation[dt.name],
          ky,
          dt.validate[ky]
        );
      });
    });

    return useFormik({
      initialValues: initials,
      validationSchema: Yup.object(validation),
      onSubmit: action,
    });
  };
  const formik = useCreateFormik(data, action);
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2>{title}</h2>
      {data.map((datum, i) => (
        <div
          key={i}
          className={`${styles.inner} ${
            formik.touched[datum.name] && formik.errors[datum.name]
              ? styles.error
              : ""
          }`}
        >
          <label htmlFor={datum.name}>{datum.label}</label>
          {datum.textarea ? (
            <textarea
              id={datum.name}
              type={datum.type}
              {...formik.getFieldProps(datum.name)}
            />
          ) : (
            <input
              id={datum.name}
              type={datum.type}
              {...formik.getFieldProps(datum.name)}
            />
          )}
          {/* {...formik.getFieldProps(datum.name)} */}
          {formik.touched[datum.name] && formik.errors[datum.name] ? (
            <span>{formik.errors[datum.name]}</span>
          ) : null}
        </div>
      ))}

      <button
        disabled={
          Object.keys(formik.touched).length &&
          Object.keys(formik.errors).length
        }
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default FormBuilder;
