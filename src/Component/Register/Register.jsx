import React, { useState } from 'react';
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function handleRegister(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      console.log(data);
      if (data.message === 'success') {
        navigate('/');
      } else {
        setMessageError('Registration failed. Please check your input and try again.');
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
      setMessageError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(10, 'Name must be at most 10 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{5,10}[!@#$%^&*(),.?":{}|<>]$/, 'Password must start with an uppercase letter, followed by lowercase letters, numbers, and special characters'),
    rePassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    phone: yup
      .string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <Helmet>
        <title>Register </title>
      </Helmet>
      <div className="w-75 mx-auto py-5">
      <h3>Register </h3>
      {messageError && (
        <div className="alert alert-danger">
          {messageError}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          name="name"
          id="name"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="alert alert-danger">{formik.errors.name}</div>
        )}

        <label htmlFor="email">Email</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.email}
          type="email"
          name="email"
          id="email"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="alert alert-danger">{formik.errors.email}</div>
        )}

        <label htmlFor="password">Password</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          name="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="alert alert-danger">{formik.errors.password}</div>
        )}

        <label htmlFor="rePassword">Confirm Password</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.rePassword}
          type="password"
          name="rePassword"
          id="rePassword"
        />
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="alert alert-danger">{formik.errors.rePassword}</div>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.phone}
          type="tel"
          name="phone"
          id="phone"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="alert alert-danger">{formik.errors.phone}</div>
        )}

        {isLoading ? (
          <button type="button" className="btn btn-success">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-success"
          >
            Register
          </button>
        )}
      </form>
    </div>
    </>

  );
}
