import React, { useState } from 'react';
import styles from './ForgetPassword.module.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');
  const navigate = useNavigate();

  const resetPassword = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
      if (data.statusMsg === 'success') {
        navigate('/RestPassword');
      } else {
        setMessageError('Password reset request failed. Please check your input and try again.');
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'An unexpected error occurred.';
      setMessageError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (<>
  <Helmet><title>Forget Password</title></Helmet>
  <div className="w-75 mx-auto py-5">
      <h3>Forget Password</h3>
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
            Confirm
          </button>
        )}
      </form>
    </div>
  </>
   
  );
}
