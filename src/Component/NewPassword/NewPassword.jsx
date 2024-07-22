import React, { useState } from 'react';
import styles from './NewPassword.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function NewPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function handlePassword(values) {
    setIsLoading(true);
    try {
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
     
      console.log(data);
      if (data.statusMsg == 'Success') {
        navigate('/Login');
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
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    newPassword: yup
      .string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: handlePassword,
  });

  return (<>
  <Helmet>
    <title>New Password</title>
  </Helmet>
   <div className="w-75 mx-auto py-5">
      <h3>Reset New Password</h3>
      {messageError && (
        <div className="alert alert-danger">
          {messageError}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
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

        <label htmlFor="newPassword">New Password</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          type="password"
          name="newPassword"
          id="newPassword"
        />
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div className="alert alert-danger">{formik.errors.newPassword}</div>
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
            Reset Password
          </button>
        )}
      </form>
    </div>
  </>
   
  );
}
