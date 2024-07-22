import React, { useContext, useState } from 'react';
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';

export default function CheckOut() {
  const { onlinePayment ,cartId} = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(values) {
    setIsLoading(true);
    setError('');
    try {
      let response = await onlinePayment(cartId,values);
      if (response.data.status === 'success') {
        window.location.href = response.data.session.url;
        
      } else {
        setError('Payment failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    details: Yup.string().required('Details are required'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number'),
    city: Yup.string().required('City is required'),
  });

  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (<><Helmet><title>Check Out</title></Helmet>
    <div className='w-50 py-5 mx-auto'>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input
          type="text"
          name='details'
          id='details'
          className='form-control'
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.details && formik.errors.details ? <div className="alert alert-danger">{formik.errors.details}</div> : null}

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name='phone'
          id='phone'
          className='form-control'
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

        <label htmlFor="city">City</label>
        <input
          type="text"
          name='city'
          id='city'
          className='form-control'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city ? <div className="alert alert-danger">{formik.errors.city}</div> : null}

        <button className='btn btn-outline-success w-100 my-3' type='submit' disabled={isLoading}>
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Pay'}
        </button>
        {error && <div className="alert alert-danger">{error}</div>}
      </form>
    </div></>
    
  );
}
