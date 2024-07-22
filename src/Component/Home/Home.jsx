import React from 'react'

import FeaturedProudacts from '../FeaturedProudacts/FeaturedProudacts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet';
export default function Home() {
  return (
    <>
      <Helmet>

        <title>Home Page</title>

      </Helmet>
      <MainSlider />
      <CategorySlider />
      <FeaturedProudacts />
    </>
  )
}
