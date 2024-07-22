import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './MainSlider.module.css';
import MainSliderPhoto from '../../Assets/Images/slider-image-3.jpeg';
import MainSliderPhoto1 from '../../Assets/Images/slider-image-1.jpeg';
import MainSliderPhoto2 from '../../Assets/Images/grocery-banner-2.jpeg';
import MainSliderPhoto3 from '../../Assets/Images/slider-image-2.jpeg';
import MainSliderPhoto4 from '../../Assets/Images/slider-2.jpeg';
import MainSliderPhoto5 from '../../Assets/Images/grocery-banner.png';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

  };

  return (
    <div className="row pt-4">
      
        <Slider {...settings}>
          <div>
            <img src={MainSliderPhoto} alt="Main Slider 1" height={400}className="w-100" />
          </div>
          <div>
            <img src={MainSliderPhoto2} alt="Main Slider 2" height={400}className="w-100" />
          </div>
          <div>
            <img src={MainSliderPhoto4} alt="Main Slider 3" height={400}className="w-100" />
          </div>
          <div>
            <img src={MainSliderPhoto5} alt="Main Slider 4" height={400}className="w-100" />
          </div>
          <div>
          <img src={MainSliderPhoto1} alt="Slider Photo 1" height={400}className="w-100" />
          </div>
          <div>
          <img src={MainSliderPhoto3} alt="Slider Photo 2" height={400}className="w-100" />
          </div>
        </Slider>
      
    </div>
  );
}
