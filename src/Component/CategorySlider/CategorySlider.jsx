import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import styles from './CategorySlider.module.css'; // Ensure this is correctly imported if you use it

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error('Failed to fetch Categories', error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1 // Adjusted from 7 to 1 to match slidesToShow
  };

  return (
    <><div className="pt-2 pb-5"> 
    <h2 className='py-4 text-black-50 font-medium'>Shop Popular Categories</h2>
    <Slider {...settings}>
    {categories.map((cat) => (
      <div key={cat._id}  >
        <img src={cat.image} className='w-100' height={200} alt={cat.name} />
        <h2 className='h6 pt-2 text-black-50'>{cat.name}</h2>
      </div>
    ))}
  </Slider ></div>
      
    </>
  );
}
