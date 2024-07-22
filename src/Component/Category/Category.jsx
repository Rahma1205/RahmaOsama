import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './Category.module.css';

export default function Category() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories'); // Adjust the API endpoint if necessary
      setCategories(data.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
      toast.error('Failed to fetch categories');
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="row pt-5">
        {categories.map((cat) => (
          <div key={cat._id} className={`Proudact-hover col-md-2 ${styles.cat}`}>
            <div className="product px-2 py-4 cursor-pointer">
              <Link to={'/Product'}>
                <img className="w-100" src={cat.image} alt={cat.slug} />
                <span className="text-success fw-bold fs-6">{cat.name}</span> {/* Adjust according to actual data structure */}
                
                
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
