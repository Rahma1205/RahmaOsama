import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';


export default function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null); // Use an object for single product details
  const [loading, setLoading] = useState(true); // Add loading state
  const { addToCart,setnumOfCartItems } = useContext(CartContext);

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

  const getProductDetails = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (error) {
      console.error('Failed to fetch product', error);
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]); // Include id in dependency array

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (loading) {
    return <div className=' d-flex justify-content-center align-items-center icon-container'><i class="fa-solid fa-spinner fa-spin fa-2xl "></i></div>; // Display a loading message while data is being fetched
  }

  if (!productDetails) {
    return <div>No product details available.</div>; // Handle case where no product details are available
  }

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <Slider {...settings}>
            {/* Assuming productDetails.images is an array of image URLs */}
            {productDetails.images?.map((image, index) => (
              <div key={index}>
                <img src={image} alt={productDetails.title} className="w-100" />
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h1>{productDetails.title}</h1>
          <p>{productDetails.description}</p>
          <div className="d-flex justify-content-between">
            <span className="text-muted">{productDetails.price} EGP</span>
            <span className="text-muted">
              <i className="fas fa-star text-warning"></i> {productDetails.ratingsAverage}
            </span>
          </div>
          <button onClick={() => addProduct(productDetails._id)} className="btn btn-success text-white w-100">
              + Add to cart
            </button>
        </div>
      </div>
    </div>
  );
}
