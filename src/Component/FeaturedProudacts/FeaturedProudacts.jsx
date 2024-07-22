import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProudacts.module.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import  { CartContext } from '../../Context/CartContext';

export default function FeaturedProducts() {
  const { addToCart,setnumOfCartItems } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  async function addProduct(productId) {
    
      let response = await addToCart(productId);
  
      if(response.data.status=='success'){
        setnumOfCartItems(response.data.numOfCartItems);
        toast.success('Product added successfully to cart');

      }
      else{
        toast.error('Error adding product to cart');
      }
    
  }

  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
      toast.error('Failed to fetch products');
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="row">
      {products.map((product) => (
        <div key={product._id} className={`Proudact-hover col-md-2 ${styles.product}`}>
          <div className="product px-2 py-4 cursor-pointer">
            <Link to={'/ProudactDetails/'+product._id}>
              <img className="w-100" src={product.imageCover} alt={product.title} />
              <span className="text-success fw-bold fs-6">{product.category.name}</span> {/* Adjust according to actual data structure */}
              <h3 className="h6 fw-bolder">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className="d-flex justify-content-between">
                <span className="text-muted">{product.price} EGP</span>
                <span className="text-muted">
                  <i className="fas fa-star text-warning"></i> {product.ratingsAverage}
                </span>
              </div>
            </Link>
            <button onClick={() => addProduct(product._id)} className="btn btn-success text-white w-100">
              + Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  
  );
}
