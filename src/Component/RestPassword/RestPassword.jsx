import React, { useState } from 'react';
import styles from './RestPassword.module.css';
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
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      if (data.status === 'Success') {
        navigate('/NewPassword');
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
    resetCode: Yup.string()
      .required('Reset code is required')
      .matches(/^\d{6}$/, 'Reset code must be a 6-digit number'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (<>
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
    <div className="w-75 mx-auto py-5">
      <h3>Forget Password</h3>
      {messageError && (
        <div className="alert alert-danger">
          {messageError}
        </div>
      )}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode">Reset Code</label>
        <input
          onBlur={formik.handleBlur}
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.resetCode}
          type="text"
          name="resetCode"
          id="resetCode"
        />
        {formik.errors.resetCode && formik.touched.resetCode && (
          <div className="alert alert-danger">{formik.errors.resetCode}</div>
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
