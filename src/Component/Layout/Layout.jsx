import React from 'react'
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Layout({userData,setUserData}) {
  let navigate= useNavigate()
  function Logout(){
    localStorage.removeItem('userToken')
    setUserData(null)
    navigate('/')
  }
  return (
<>
<div className='pt-5'> <Navbar userData={userData} Logout={Logout}/>
<Outlet></Outlet>

   </div>

    </>
  )
}
