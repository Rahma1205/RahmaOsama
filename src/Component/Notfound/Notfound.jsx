import React from 'react'
import styles from './Notfound.module.css';
import Error from '../../Assets/Images/oops-404-error-with-broken-robot-concept-illustration_114360-5529.avif'
export default function Notfound() {
  return (
<>
<div className="container">
  <div className="w-25  m-auto mt-5">
  <img src={Error} alt="" />
  </div>
</div></>
  )
}
