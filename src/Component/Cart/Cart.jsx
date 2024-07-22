import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {CartContext} from '../../Context/CartContext'
import { Helmet } from 'react-helmet';

export default function Cart() {
  let [cartDetails, setCartDetails] = useState(null);
  let { getLoggedUserCart, removeItemFromCart, updateProductCount } = useContext(CartContext);

  async function getCart() {
    let response = await getLoggedUserCart();
    if (response.data.status === 'success') {
    
      setCartDetails(response.data.data);
    }

  }

  async function deleteItem(productId) {
    let response = await removeItemFromCart(productId);
    if (response.data.status === 'success') {
      setCartDetails(response);
      toast.success('Product Successfully Removed');
    }
    else{
      toast.error('Cannot remove product ');
    }
  }

  async function updateCartQuantity(productId, count) {
    let response = await updateProductCount(productId, count);
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
      toast.success('Product count updated');
    }
    
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
      {cartDetails!==null ? (
        <div>
          <div className="p-4 bg-light my-5">
          <h3>Shop Cart</h3>
          <h6 className='text-success'>Total Cart Price: {cartDetails.totalCartPrice}EGP</h6>
        </div>
         
        </div>
        
        
      ) : null}
      {cartDetails && cartDetails.products && cartDetails.products.map((product) => (
        <div key={product.product.id} className='row border-bottom py-2 align-items-center'>
          <div className="col-md-1">
            <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div>
              <h6>{product.product.title}</h6>
              <h6 className='text-success'>Price: {product.price}</h6>
              <button className='btn m-0 p-0' onClick={() => deleteItem(product.product._id)}>
              <i className='fa-regular text-success fa-trash-can'></i> Remove
            </button>
            </div>
            
            <div>
              <button onClick={() => updateCartQuantity(product.product._id, product.count + 1)} className='btn btn-outline-success btn-sm'>+</button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => updateCartQuantity(product.product._id, product.count - 1)} className='btn btn-outline-success btn-sm'>-</button>
            </div>
          </div>
          
        </div>
    
        
      ))}
           <button className='btn  btn-success w-100'>
        <Link className='text-white text-decoration-none ' to={'/CheckOut'}>
          CheckOut
        </Link>
      </button>
    </>
  );
}
