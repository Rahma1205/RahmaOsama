import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  async function handleLogin(values) {
    setIsLoading(true);
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success') {
        localStorage.setItem('userToken', data.token);
        saveUserData();
        navigate('/Home');
      } else {
        setIsError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'An unexpected error occurred.';
      setIsError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup
    .string()
    .required('Password is required')
    .matches(/^[A-Z][a-z0-9]{5,10}[!@#$%^&*(),.?":{}|<>]$/, 'Password must start with an uppercase letter, followed by lowercase letters, numbers, and special characters'),

  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (<>
   <Helmet>
        <title>Login</title>
      </Helmet>
  <div className="w-75 mx-auto py-5">
      <h3>Login</h3>
      {isError && <div className="alert alert-danger">{isError}</div>}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          className="form-control mb-2"
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          type="email"
          name="email"
          id="email"
        />
        {formik.errors.email && formik.touched.email && <div className="alert alert-danger">{formik.errors.email}</div>}

        <label htmlFor="password">Password:</label>
        <input
          className="form-control mb-2"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.password}
          type="password"
          name="password"
          id="password"
        />
        {formik.errors.password && formik.touched.password && <div className="alert alert-danger">{formik.errors.password}</div>}

        {isLoading ? (
          <button type="button" className="btn btn-success">
            <i className="fas fa-spinner fa-spin"></i>
          </button>
        ) : (
          <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-success">
            Login
          </button>
        )}
        <div >
        
          <Link className='px-2 link-success text-decoration-none 'to='/ForgetPassword'>Forgotten Password?</Link>
        </div>
        <div className='d-flex justify-content-center align-items-center  '>
          <h5>Don't have an account?</h5>
          <Link className='px-2 link-success text-decoration-none 'to='/Register'>Register Now</Link>
        </div>
      </form>
    </div>
  </>
    
  );
}
