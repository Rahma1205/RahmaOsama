import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import logo from '../../Assets/Images/images (2).png'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
export default function Navbar({ userData, Logout }) {
  let { numOfCartItems } = useContext(CartContext);
  return (
    <>  <nav className="navbar navbar-expand-lg  bg-light border border-success-subtle m-3 rounded-4 fixed-top" >

      <div className="container-fluid  ">
        <div className='d-flex'>    <Link className="navbar-brand " to="/">
          <img src={logo} className='w-25' alt="" />
        </Link>
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon " ></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userData !== null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
            <li className="nav-item">
              <Link class="nav-link active " aria-current="page" to="Home">Home</Link>
            </li>

            <li className="nav-item">
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="Product">Products </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="Categories">Categories </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="allorders">Orders </Link>
            </li>



          </ul> : null}

          {userData == null ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0 curser-pointer">
            <li className='m-2'>

              <a href="https://www.facebook.com/profile.php?id=100005932775142"  target="_blank"> <i className='text-black fas fa-brands fa-facebook '  ></i></a>

            </li>
            <li className='m-2'>
              <a href="https://www.linkedin.com/in/rahma-osama-279a4531a/" target='_balnk'> <i class="fa-brands fa-linkedin text-black"></i></a>
             
            </li>
            <li className='m-2 '>
              <a href="https://www.instagram.com/rahmaosamaa/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className='fas fa-brands fa-instagram text-black'></i>
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="Register"> Register </Link>
            </li>
            <li className="nav-item">

              <Link className="nav-link" to="/"> Login</Link>
            </li>




          </ul> : <ul className="navbar-nav ms-auto mb-2 mb-lg-0 curser-pointer">
            <li className='m-2'>
              <i className='fas fa-brands fa-facebook'></i>
            </li>
            <li className='m-2'>
              <i className='fas fa-brands fa-twitter'></i>
            </li>
            <li className='m-2'>
              <i className='fas fa-brands fa-instagram'></i>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link p-2" to="Cart"> <i className='fas fa-regular fa-shopping-basket fa-lg'></i>
                <span className='badge bg-success text-white position-absolute top-0 end-0'>{numOfCartItems}</span> </Link>
            </li>

            <li className="nav-item">
              <span className="nav-link" onClick={Logout}>Logout </span>
            </li></ul>}

        </div>
      </div>
    </nav> </>
  )
}
